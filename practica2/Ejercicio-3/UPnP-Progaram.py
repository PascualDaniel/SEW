

import xml.etree.ElementTree as ET




def print_seguro(xml, dire, name):
    try:
        temp = xml.find(dire).text
        print('\t-> %s: %s' % (name, temp))
    except AttributeError:
        return

    return

def parse_locations(r):
                root = r;

                print_seguro(root, "./{urn:schemas-upnp-org:device-1-0}device/{urn:schemas-upnp-org:device-1-0}deviceType", "Dispositivo Principal")
                print_seguro(root, "./{urn:schemas-upnp-org:device-1-0}device/{urn:schemas-upnp-org:device-1-0}friendlyName", "Nombre")

                print('\t-> Servicios:')
                services = root.findall(".//*{urn:schemas-upnp-org:device-1-0}serviceList/")
                for service in services:
                    print('\t\t=> Tipo: %s' % service.find('./{urn:schemas-upnp-org:device-1-0}serviceType').text)
                    print('\t\t=> Evento de control: %s' % service.find('./{urn:schemas-upnp-org:device-1-0}controlURL').text)
                    print('\t\t=> Evento de URl: %s' % service.find('./{urn:schemas-upnp-org:device-1-0}eventSubURL').text)
                print('\t-> Dispositivos:')
                devices = root.findall(".//*{urn:schemas-upnp-org:device-1-0}deviceList/")
                for device in devices:
                    print('\t\t=> Tipo: %s' % device.find('./{urn:schemas-upnp-org:device-1-0}deviceType').text)
                    print('\t\t=> Nombre: %s' % device.find('./{urn:schemas-upnp-org:device-1-0}friendlyName').text)

                return


def main():
    filename = "upnp.xml"
    document = ET.parse(filename)
    root = document.getroot();
    parse_locations(root)

if __name__ == "__main__":
    main()