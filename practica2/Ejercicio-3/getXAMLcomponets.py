

import xml.etree.ElementTree as ET




def print_seguro(xml, dire, name):
    try:
        temp = xml.find(dire).text
        print('\t-> %s: %s' % (name, temp))
    except AttributeError:
        return

    return

def parse_locations(r):
                root = r
                print('=> Componentes del XAML:')
                componentes = root.find("{http://schemas.microsoft.com/winfx/2006/xaml/presentation}Grid")
                for componente in componentes:
                    print('\t-Componente: '+componente.tag.replace("{http://schemas.microsoft.com/winfx/2006/xaml/presentation}",'') +', con una dispocicion:')
                    print( '\t\tHorizontalAlignment:' +componente.get('HorizontalAlignment'))
                    print( '\t\tVerticalAlignment:' +componente.get('VerticalAlignment'))
                    print( '\t\tMargin:' +componente.get('Margin'))
                return


def main():
    filename = "MainWindow.xaml"
    document = ET.parse(filename)
    root = document.getroot()
    parse_locations(root)

if __name__ == "__main__":
    main()