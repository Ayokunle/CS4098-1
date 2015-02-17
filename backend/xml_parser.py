try:
    from lxml import etree
except ImportError:
    import xml.etree.ElementTree as etree

tree = etree.parse('process_table.xml')  

for process in tree.iter("process"):
	print("%s - %s" % (process.tag, process.attrib))
	for action in process.iter("action"):
		print(" %s - %s" % (action.tag, action.attrib))
		
		for script in action.iter("script"):
			print("  %s - %s" % (script.tag, script.text))
		
		for req_resource in action.iter("req_resource"):
			print("  %s - %s" % (req_resource.tag, req_resource.text))
		
		for prov_resource in action.iter("prov_resource"):
			print("  %s - %s" % (prov_resource.tag, prov_resource.text))

