var CryptoJS = require('crypto-js');
var utf8     = require('utf8'); 

/**
* TripleDES encryption
*
* @method encrypt
* @param {String} key
* @param {String} text
*/ 
function encrypt(key, text) 
{
	var CryptoJS = require('crypto-js');
	var forge    = require('node-forge');
	var utf8     = require('utf8');   
	key          = CryptoJS.MD5(utf8.encode(key)).toString(CryptoJS.enc.Latin1);
	key          = key + key.substring(0, 8); 
	var cipher   = forge.cipher.createCipher('3DES-ECB', forge.util.createBuffer(key));
	cipher.start({iv:''});
	cipher.update(forge.util.createBuffer(text, 'utf-8'));
	cipher.finish();
	var encrypted = cipher.output; 
	return ( forge.util.encode64(encrypted.getBytes()) ); 
}
module.exports = encrypt;