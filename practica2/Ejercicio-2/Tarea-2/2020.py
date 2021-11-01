


import xml.etree.ElementTree as ET

def main():
    filename = "rutas.xml"
    document = ET.parse(filename)
    root = document.getroot()


    texto =get_String(root,2)

    head=addHtmlHead(texto)
    saveToFile(head,2)
    print(head)




def get_String(root,i):
    text=""
    ruta = root.findall("ruta")[i]
    for element in ruta:
                if(element.tag == "nombre"):
                    text += element.text +"""
                </name>
                <LineString>
                <extrude>1</extrude>
                <tessellate>1</tessellate>
                <coordinates>\n"""
                elif(element.tag == "coordenadas"):
                     for ref in element:
                        if (ref.tag =="altitud"):
                            # text += ref.text
                            print("a")
                        elif (ref.tag =="longitud"):
                            text+=ref.text.strip()+","
                        else:
                            text+=ref.text.strip()
                     text+="\n"

                elif(element.tag == "hitos"):
                    for hito in element:
                        for element2 in hito:
                            if(element2.tag == "coordenadasGeo"):
                                for coorG in element2:
                                    if (coorG.tag =="altitudG"):
                                        # text += coorG.text
                                        print("a")
                                    elif (coorG.tag =="longitudG"):
                                        text+=coorG.text.strip()+","
                                    else:
                                        text+=coorG.text.strip()
                                text+="\n"

    return text


def addHtmlHead(text):
    head=""
    head+= """<?xml version="1.0" encoding="UTF-8"?>
        <kml xmlns="http://www.opengis.net/kml/2.2">
        <Document>
            <Placemark>
            <name>"""
    head += text
    head += """</coordinates>
        <altitudeMode>clampToGround</altitudeMode>
        </LineString>
        <Style> id='lineaRoja'>
        <LineStyle>
        <color>#ff0000ff</color>
        <width>5</width>
        </LineStyle>
        </Style>
        </Placemark>
        </Document>
        </kml>"""
    return head


def saveToFile(text,i):
    dir = "Output"
    dir+=str(i)
    dir+=".kml"
    text_file = open(dir, "w")
    text_file.write(text)
    text_file.close()



if __name__ == '__main__':
    main()
