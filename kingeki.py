import requests

url = 'http://i.imanhua88.com/imgb/J/%BD%F8%BB%F7%B5%C4%BE%DE%C8%CB/%B5%DA{section}%BB%B0/{page}.jpg'

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}

def downloadImageFile(imgUrl):
    local_filename = imgUrl.split('/')[-1]
    print "Download Image File=", local_filename
    r = requests.get(imgUrl, stream=True, headers=headers) # here we need to set stream = True parameter
    with open("/Users/safeioser/pandy/"+local_filename, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024):
            if chunk: # filter out keep-alive new chunks
                f.write(chunk)
                f.flush()
        f.close()
    return local_filename