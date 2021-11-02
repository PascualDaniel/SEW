
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
    texto = "<li>\n"
    name = persona.find('{http://www.uniovi.es/arbol}nombre').text
    apellidos = persona.find('{http://www.uniovi.es/arbol}apellidos').text
    comentarios = persona.find('{http://www.uniovi.es/arbol}comentarios').text
    texto += "<a> "+ name +" "+ apellidos +", quien: "+  comentarios+"</a>\n"
    texto += "<ul>\n"
  
    for element in persona:
        if(element.tag == "{http://www.uniovi.es/arbol}datosNacimiento"):
            texto += "<li>\n"
            fecha = element.find('{http://www.uniovi.es/arbol}fechaNacimiento').text
            lugar = element.find('{http://www.uniovi.es/arbol}lugarNacimiento').text
            coordenadas = element.find('{http://www.uniovi.es/arbol}coordenadasNacimiento')
            longitud=coordenadas.find('{http://www.uniovi.es/arbol}longitud').text
            latitud=coordenadas.find('{http://www.uniovi.es/arbol}latitud').text
            altitud=coordenadas.find('{http://www.uniovi.es/arbol}altitud').text
            texto += "<a>Nacio en: "+lugar +" el "+ fecha+" - "+longitud+","+latitud+","+altitud+"</a>\n" 
            texto += "</li>\n"
        if(element.tag == "{http://www.uniovi.es/arbol}datosFallecimiento"):
            texto += "<li>\n"
            fecha = element.find('{http://www.uniovi.es/arbol}fechaFallecimiento').text
            lugar = element.find('{http://www.uniovi.es/arbol}lugarFallecimiento').text
            coordenadas = element.find('{http://www.uniovi.es/arbol}coordenadasFallecimiento')
            longitud=coordenadas.find('{http://www.uniovi.es/arbol}longitud').text
            latitud=coordenadas.find('{http://www.uniovi.es/arbol}latitud').text
            altitud=coordenadas.find('{http://www.uniovi.es/arbol}altitud').text 
            texto += "<a>Murio en: "+lugar +" el "+ fecha+" - "+longitud+","+latitud+","+altitud+"</a>\n"             
            texto += "</li>\n"
        if(element.tag == "{http://www.uniovi.es/arbol}fotografias"):
            i=1
            for foto in element:
                texto += "<li><img src=\"multimedia/"+ foto.text+"\"  alt = \""+name+apellidos+str(i)+ "\" ></li>\n"
                i+=1
        if(element.tag == "{http://www.uniovi.es/arbol}videos"):
            i=1
            for video in element:
                texto += "<li><video src=\"multimedia/"+ video.text+"\"></video></li>\n"
        if(element.tag == "{http://www.uniovi.es/arbol}persona"):
            texto += addPerson(element)   
    texto += "</ul>\n"
    texto += "</li>\n"
    return texto


def get_String(root):
    texto = ""
    texto += "<ul>\n"
    for persona in root:
        texto += addPerson(persona)
    texto += "</ul>\n"

    return texto



def addHtmlHead(text):
    head=""
    head+= """<!DOCTYPE HTML>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial scale=1.0" />
    <meta name="author" content="Daniel Pascual">
    <meta name="description" content="Una pagina web sobre un Arbol Genalogico">
    <meta name="keywords" content="Arbol Genalogico">
    <title>Arbol Genalogico</title>
    <link rel="stylesheet" type="text/css" href="estilo.css" />
    </head>
    <body>
    <header>
    <h1>Arbol Genalogico</h1>
    </header>
    <main>"""
    head += text
    head += """ </main><footer>
    <p>Por Daniel Pascual, UO269728</p>
    </footer></body></html>"""
    return head


def saveToFile(text):
    text_file = open("index.html", "w")
    text_file.write(text)
    text_file.close()



if __name__ == '__main__':
    main()
