
import xml.etree.ElementTree as ET




COUNT = 1

def increment():
    global COUNT
    COUNT = COUNT+1

def main():
    filename = "arbol.xml"
    document = ET.parse(filename)
    root = document.getroot()

    texto =get_String(root)
    head=addHtmlHead(texto)
    saveToFile(head)
    print(head)



def addPerson(persona,x):
    ##  height=\"40\" 
    
    texto = " <rect x=\""+str(x)+"\" y=\""+str(COUNT*30)+"\" width=\"1000\" height=\"30\" style=\"fill:white;stroke:black;stroke-width:1\" />\n"
    texto+= "<text x=\""+str(x+10)+"\" y=\""+str(COUNT*30+10)+"\" font-size=\"10\" style=\"fill:black\">\n"
    name = persona.find('{http://www.uniovi.es/arbol}nombre').text
    apellidos = persona.find('{http://www.uniovi.es/arbol}apellidos').text
    comentarios = persona.find('{http://www.uniovi.es/arbol}comentarios').text
    texto += name + " " + apellidos +" , quien: "+ comentarios 
   
    nacimiento =persona.find("{http://www.uniovi.es/arbol}datosNacimiento")
    fecha = nacimiento.find('{http://www.uniovi.es/arbol}fechaNacimiento').text
    lugar = nacimiento.find('{http://www.uniovi.es/arbol}lugarNacimiento').text
    coordenadas = nacimiento.find('{http://www.uniovi.es/arbol}coordenadasNacimiento')
    longitud=coordenadas.find('{http://www.uniovi.es/arbol}longitud').text
    latitud=coordenadas.find('{http://www.uniovi.es/arbol}latitud').text
    altitud=coordenadas.find('{http://www.uniovi.es/arbol}altitud').text
    texto+= " ,nacio en " +lugar +"("+latitud+","+longitud+","+altitud+") el "+ fecha

    fallecimiento =persona.find("{http://www.uniovi.es/arbol}datosFallecimiento")
    if(fallecimiento is not None):
        fecha = fallecimiento.find('{http://www.uniovi.es/arbol}fechaFallecimiento').text
        lugar = fallecimiento.find('{http://www.uniovi.es/arbol}lugarFallecimiento').text
        coordenadas = fallecimiento.find('{http://www.uniovi.es/arbol}coordenadasFallecimiento')
        longitud=coordenadas.find('{http://www.uniovi.es/arbol}longitud').text
        latitud=coordenadas.find('{http://www.uniovi.es/arbol}latitud').text
        altitud=coordenadas.find('{http://www.uniovi.es/arbol}altitud').text 
        texto+= " y murio en " +lugar +"("+latitud+","+longitud+","+altitud+") el "+ fecha
    
    texto+= "</text>\n"
    texto+= "<text x=\""+str(x+10)+"\" y=\""+str(COUNT*30+20)+"\" font-size=\"10\" style=\"fill:black\">\n"
    fotografias = persona.find("{http://www.uniovi.es/arbol}fotografias") 
    texto+= "Fotos: "
    for foto in fotografias:
        texto += foto.text +" "
    videos =persona.find("{http://www.uniovi.es/arbol}videos")    
    if(videos is not None):
        texto+= " y Videos: "
        for video in videos:
            texto += video.text +" "
    texto+= "</text>\n"
    padres = persona.findall("{http://www.uniovi.es/arbol}persona")
    increment()
    for padre in padres:
        texto += addPerson(padre,x+50)   


    return texto


def get_String(root):
    texto = ""
    for persona in root:
        texto += addPerson(persona,20)
    return texto



def addHtmlHead(text):
    head=""
    head+= """<?xml version="1.0" encoding="utf-8"?>
    <svg width="100%" height="100%" version="1.1"
    xmlns="http://www.w3.org/2000/svg">"""
    head += text
    head += """ </svg>"""
    return head


def saveToFile(text):
    text_file = open("Output.svg", "w")
    text_file.write(text)
    text_file.close()



if __name__ == '__main__':
    main()
