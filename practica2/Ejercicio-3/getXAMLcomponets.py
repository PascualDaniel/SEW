

import xml.etree.ElementTree as ET


def parse_locations(r):
    text = ""
    root = r
    text+='=> Componentes del XAML:\n'
    componentes = root.find(
        "{http://schemas.microsoft.com/winfx/2006/xaml/presentation}Grid")
    for componente in componentes:
        text+='\t-Componente: '+componente.tag.replace(
            "{http://schemas.microsoft.com/winfx/2006/xaml/presentation}", '') + ', con una dispocicion:\n'
        text+='\t\tHorizontalAlignment:' + componente.get('HorizontalAlignment')+"\n"
        text+='\t\tVerticalAlignment:' + componente.get('VerticalAlignment')+"\n"
        text+='\t\tMargin:' + componente.get('Margin')+"\n"
    return text


def saveToFile(text):
    text_file = open("Output.txt", "w")
    text_file.write(text)
    text_file.close()


def main():
    filename = "MainWindow.xaml"
    document = ET.parse(filename)
    root = document.getroot()
    text = parse_locations(root)
    saveToFile(text)


if __name__ == "__main__":
    main()
