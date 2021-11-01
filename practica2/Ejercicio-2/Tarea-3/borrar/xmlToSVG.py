


import xml.etree.ElementTree as ET


class Punto:
     def __init__(self, nombre,altura):
         self.nombre=nombre
         self.altura=altura







def main():
    filename = "rutas.xml"
    document = ET.parse(filename)
    root = document.getroot()

    puntos =get_Puntos(root,2)



    head=createString(puntos)
    saveToFile(head,2)
    print(head)




def get_Puntos(root,i):
                puntos =[]
                ruta = root.findall("ruta")[i]
                nombre=ruta.find("inicio").text
                altu = ruta.find("coordenadas").find("altitud").text.strip()
                puntos.append(Punto(nombre,altu))
                for hito in ruta.find("hitos"):
                    puntos.append(Punto(hito.find("nombreHito").text  , hito.find("coordenadasGeo").find("altitudG").text.strip() ))
                return puntos


def createString(puntos):

    alturas =[]
    for punto in puntos:
        alturas.append(float( punto.altura))
    minimo = float (min (alturas))
    maximo = float( max(alturas))

    head=""
    head+= """<svg xmlns = "http://www.w3.org/2000/avg" viewBox = "-40 70 300 100">\n"""
    head+= """<text x = "110"  y=\""""+str(205-((0)*30))+ """\" transform = "rotate(90,100,100)">"""+"Inicio"+"""</text>\n"""
    for i in  range (len(puntos)):
        head+= """<text x = "110"  y=\""""+str(205-((i+1)*30))+ """\" transform = "rotate(90,100,100)">"""+puntos[i].nombre.strip()+"""</text>\n"""
    head+= """<text x = "110"  y=\""""+str(205-((len(puntos)+1)*30))+ """\" transform = "rotate(90,100,100)">"""+"Fin"+"""</text>\n"""
    head+="""
        <polyline fill = "red"
        stroke = "black"
        stroke-width = "3" """
    head+=""" points = """
    head+= """ "0,100 30,"""
    for i in  range (len(puntos)):
        num = int(puntos[i].altura.strip())
        head+= str( transforNum (num,maximo,minimo) )+" " + str(((i+2)*30))+","

    head+="""100 0,100"/>
            </svg>"""
    return head

def transforNum(num,maximo,minimo):
    a= 100-(100*(num-minimo))/((maximo-minimo)+00)
    return a

def saveToFile(text,i):
    dir = "Output"
    dir+=str(i)
    dir+=".svg"
    text_file = open(dir, "w")
    text_file.write(text)
    text_file.close()



if __name__ == '__main__':
    main()
