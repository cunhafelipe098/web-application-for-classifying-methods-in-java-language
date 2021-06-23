public class CustomMethodVisitorForIC {
    public void aaaaaaaaaaaaaaaaaaaaaaaaaa(Node node) {
        if (node instanceof MethodDeclaration || node instanceof ConstructorDeclaration) {
            JavaMetricParser.METHOD_COUNTER++;
            MetricCollector collector = new MetricCollector();
            collector._file = null;
            collector._path = null;
            if (node instanceof MethodDeclaration) {
                for (Modifier c : ((MethodDeclaration) node).getModifiers()) {
                    collector.addToken(c.toString());
                    MapUtils.addOrUpdateMap(collector.mapRemoveFromOperands, c.toString());
                    collector.MOD++;
                }
                MethodDeclaration m = (MethodDeclaration) node;
                StringBuilder sb = new StringBuilder();
                try{
                    sb.append(m.getDeclarationAsString()).append(m.getBody().get());
                }catch(Exception e){
                    //ignore this method has no method body
                }
                collector.SLOC = SourceCodeLineCounter.getNumberOfLines(sb.toString().split("[\\r\\n]+"));
            }
            if (node instanceof ConstructorDeclaration) {
                for (Modifier c : ((ConstructorDeclaration) node).getModifiers()) {
                    collector.addToken(c.toString());
                    MapUtils.addOrUpdateMap(collector.mapRemoveFromOperands, c.toString());
                    collector.MOD++;
                }
                ConstructorDeclaration m = (ConstructorDeclaration) node;
                StringBuilder sb = new StringBuilder();
                try{
                    sb.append(m.getDeclarationAsString()).append(m.getBody());
                }catch(Exception e){
                    //ignore this method has no method body
                }
                collector.SLOC = SourceCodeLineCounter.getNumberOfLines(sb.toString().split("[\\r\\n]+"));
            }
            if (this.APPLY_SLOC_FILTER && collector.SLOC < this.MIN_SLOC_ALLOWED) {
                return;
            }
            NodeList<ReferenceType> exceptionsThrown = null;
            if (node instanceof MethodDeclaration) {
                exceptionsThrown = ((MethodDeclaration) node).getThrownExceptions();
            }
            if (node instanceof ConstructorDeclaration) {
                exceptionsThrown = ((ConstructorDeclaration) node).getThrownExceptions();
            }
            if (exceptionsThrown.size() > 0) {
                collector.addToken("throws");
            }
            NodeList<Parameter> nl = null;
            if (node instanceof MethodDeclaration) {
                nl = ((MethodDeclaration) node).getParameters();
            }
            if (node instanceof ConstructorDeclaration) {
                nl = ((ConstructorDeclaration) node).getParameters();
            }
            for (Parameter p : nl) {

                for (Node c : p.getChildNodes()) {
                    if (c instanceof SimpleName)
                        MapUtils.addOrUpdateMap(collector.mapParameter, c.toString());
                }
            }
            collector.NOA = nl.size();
            collector.START_LINE = node.getBegin().get().line;
            collector.END_LINE = node.getEnd().get().line;
            if (node instanceof MethodDeclaration) {
                collector._methodName = ((MethodDeclaration) node).getName().asString();
            }
            if (node instanceof ConstructorDeclaration) {
                collector._methodName = ((ConstructorDeclaration) node).getName().asString();
            }
            MapUtils.addOrUpdateMap(collector.mapRemoveFromOperands, collector._methodName);
            node.accept(new MethodVisitor(), collector);
            collector.computeHalsteadMetrics();
            collector.COMP++; // add 1 for the default path.
            collector.NOS++; // accounting for method declaration
            collector.mapInnerMethods.remove(collector._methodName);
            MapUtils.subtractMaps(collector.mapInnerMethodParameters, collector.mapParameter);
            collector.populateVariableRefList();
            collector.populateMetricHash();
            String fileId = "dummyFileId";//JavaMetricParser.fileIdPrefix + JavaMetricParser.FILE_COUNTER;
            String methodId = "dummyMethodId";//fileId + "00" + JavaMetricParser.METHOD_COUNTER;
            // System.out.println("fileId is : " + fileId + ", methodId
            // is: " + methodId);
            collector.fileId = 0l;//Long.parseLong(fileId);
            collector.methodId = 1l;//Long.parseLong(methodId);
            // System.out.println(collector);
            this.results.add(this.generateInputForOreo(collector));
            //this.generateInputForScc(collector);
        }

    }
}

