import xml.etree.ElementTree as ET

def main():
    filename = "arbol.xml"
    document = ET.parse(filename)
    root = document.getroot()

    texto =get_String(root)
    head=addHtmlHead(texto)
    saveToFile(head)
    print(head)



def addPerson(persona):
    texto = ""
    for element in persona:
        if(element.tag == "{http://www.uniovi.es/arbol}datosNacimiento"):
            lugar = element.find('{http://www.uniovi.es/arbol}lugarNacimiento').text

            texto+=" <Placemark><name>"+lugar+"</name>"
            
            texto += "<Point> <coordinates>"

            coordenadas = element.find('{http://www.uniovi.es/arbol}coordenadasNacimiento')
            longitud=coordenadas.find('{http://www.uniovi.es/arbol}longitud').text.strip()
            latitud=coordenadas.find('{http://www.uniovi.es/arbol}latitud').text.strip()
            altitud=coordenadas.find('{http://www.uniovi.es/arbol}altitud').text.strip()
            texto += longitud+","+latitud+","+altitud+"</coordinates></Point></Placemark>\n"
        if(element.tag == "{http://www.uniovi.es/arbol}datosFallecimiento"):
            lugar = element.find('{http://www.uniovi.es/arbol}lugarFallecimiento').text
            texto+=" <Placemark><name>"+lugar+"</name>"
            texto += "<Point> <coordinates>"
            coordenadas = element.find('{http://www.uniovi.es/arbol}coordenadasFallecimiento')
            longitud=coordenadas.find('{http://www.uniovi.es/arbol}longitud').text.strip()
            latitud=coordenadas.find('{http://www.uniovi.es/arbol}latitud').text.strip()
            altitud=coordenadas.find('{http://www.uniovi.es/arbol}altitud').text.strip()
            texto += longitud+","+latitud+","+altitud+"</coordinates></Point></Placemark>\n"
        if(element.tag == "{http://www.uniovi.es/arbol}persona"):
            texto += addPerson(element)
    return texto


def get_String(root):
    texto = ""
    for persona in root:
        texto += addPerson(persona)

    return texto




def addHtmlHead(text):
    head=""
    head+= """<?xml version="1.0" encoding="UTF-8"?>
        <kml xmlns="http://www.opengis.net/kml/2.2">
        <Document>"""
    head += text
    head += """ 
        </Document>
        </kml>"""
    return head


def saveToFile(text):
    text_file = open("Output.kml", "w")
    text_file.write(text)
    text_file.close()



if __name__ == '__main__':
    main()
