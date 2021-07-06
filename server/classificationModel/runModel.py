import pickle
import sys


arrayScore = sys.argv[1].strip(" ").strip("[").strip(']').split(',')
filename = '/home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/classificationModel/predict_code_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))

output = open("/home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/classificationModel/output.txt", "w")

dataToSendBack = str(loaded_model.predict([arrayScore])) + str(loaded_model.predict_proba([arrayScore]))

output.writelines(dataToSendBack)
output.close()