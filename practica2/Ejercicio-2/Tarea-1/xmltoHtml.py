#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      Usuario
#
# Created:     02/11/2020
# Copyright:   (c) Usuario 2020
# Licence:     <your licence>
#-------------------------------------------------------------------------------
import xml.etree.ElementTree as ET

def main():
    filename = "rutas.xml"
    document = ET.parse(filename)
    root = document.getroot();

    texto =get_String(root)
    head=addHtmlHead(texto)
    saveToFile(head)
    print(head)




def get_String(root):
    texto = ""
    for ruta in root.findall("ruta"):
        texto += "<ul>\n"
        for element in ruta:
            texto += "<li>\n"
            if(element.tag == "coordenadas"):
                texto += element.tag+ ":\n"
                texto += "<ul>\n"
                for coor in element:
                    texto += "<li>\n"
                    texto += coor.tag+ ": "
                    texto += coor.text
                    texto += "</li>\n"
                texto += "</ul>\n"
            elif(element.tag == "referencias"):
                texto += element.tag+ ":\n"
                texto += "<ul>\n"
                for ref in element:
                    texto += "<li>\n"
                    texto += ref.tag+ ": "
                    texto += ref.text
                    texto += "</li>\n"
                texto += "</ul>\n"
            elif(element.tag == "hitos"):
                texto += element.tag+ ":\n"
                texto += "<ul>\n"
                for hito in element:
                    texto += "<li>\n"
                    texto += hito.tag+ ": "
                    texto += "<ul>\n"
                    for element2 in hito:
                        texto += "<li>\n"
                        if(element2.tag == "coordenadasGeo"):
                            texto += element2.tag+ ":\n"
                            texto += "<ul>\n"
                            for coorG in element2:
                                texto += "<li>\n"
                                texto += coorG.tag+ ": "
                                texto += coorG.text
                                texto += "</li>\n"
                            texto += "</ul>\n"
                        elif(element2.tag == "fotos"):
                            texto += element2.tag+ ":\n"
                            texto += "<ul>\n"
                            for foto in element2:
                                texto += "<li>\n"
                                texto += foto.tag+ ": "
                                texto += foto.text
                                texto += "</li>\n"
                            texto += "</ul>\n"
                        elif(element2.tag == "videos"):
                            texto += element2.tag+ ":\n"
                            texto += "<ul>\n"
                            for video in element2:
                                texto += "<li>\n"
                                texto += video.tag+ ": "
                                texto += video.text
                                texto += "</li>\n"

                            texto += "</ul>\n"
                        else:
                            texto += element2.tag+ ":\n"
                            texto += element2.text+ ":\n"
                        texto += "</li>\n"
                    texto += "</ul>\n"
                    texto += "</li>\n"
                texto += "</ul>\n"
            else:
                texto += element.tag+ ": "
                texto += element.text
            texto += "</li>\n"


        texto += "</ul>\n"

    return texto

def addHtmlHead(text):
    head=""
    head+= """<!DOCTYPE HTML>
            <html lang="es">
            <head>
            <!-- Datos que describen el documento -->
            <meta charset="UTF-8">
            <title>Rutas</title>
            <link rel="stylesheet" type="text/css" href="estilo.css" />
            </head>
            <body>"""
    head += text
    head += """</body>
            </html>"""
    return head


def saveToFile(text):
    text_file = open("Output.html", "w")
    text_file.write(text)
    text_file.close()



if __name__ == '__main__':
    main()
