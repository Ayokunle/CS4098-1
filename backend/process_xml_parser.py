from lxml import etree
import json, sys

from xml.sax.saxutils import escape, unescape

# escape() and unescape() takes care of &, < and >.
html_escape_table = {
    '"': "&quot;",
    "'": "&apos;"
}

def html_escape(text):
    return escape(text, html_escape_table)

def main():
    root = (xml_to_etree("../peos/os/kernel/%s.dat.xml" % "2"))
    print (etree.tostring(root, pretty_print=True))
    
    #parsexml(sys.argv[1])

def parsexml(patient_id):
    return xml_to_json("../peos/os/kernel/%s.dat.xml" % patient_id)

def xml_to_json(xml_input):
    '''Converts an xml file to json.'''
    return etree_to_dict(xml_to_etree(xml_input), True)

def xml_to_etree(xml_input):
    '''Converts xml to a lxml etree.'''
    f = open(xml_input, 'r')
    xml = f.read()
    f.close()
    return etree.HTML(xml)
 
def etree_to_dict(tree, only_child):
    '''Converts an lxml etree into a dictionary.'''

    if (tree.tag == "script"):
        return {tree.tag: html_escape(tree.text)}

    mydict = dict([(item[0], item[1]) for item in tree.items()])
    children = tree.getchildren()
    if children:
        if len(children) > 1:
            mydict['children'] = [etree_to_dict(child, False) for child in children]
        else:
            child = children[0]
            mydict[child.tag] = etree_to_dict(child, True)
    if only_child:
        return mydict
    else:
        return {tree.tag: mydict}

def dict_to_json(dictionary, json_output):
    '''Coverts a dictionary into a json file.'''
    #f = open(json_output, 'w')
    #f.write(json.dumps(dictionary, ensure_ascii=False))
    #f.close()
    return json.dumps(dictionary, ensure_ascii=False)

if __name__== "__main__":
    main()
