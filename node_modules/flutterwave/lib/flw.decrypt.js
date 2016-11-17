var CryptoJS = require('crypto-js');
var utf8     = require('utf8'); 

/**
* TripleDES decryption
*
* @method decrypt
* @param {String} key
* @param {String} encrypted_text (should be a base64 encoded string)
*/ 
function decrypt(key, encrypted_text) 
{
	function hTS(hex_String) {

		var hex = hex_String.toString();
		var str = '';

		for (var n = 0; n < hex.length; n += 2) 
		{
			str += String.fromCharCode(parseInt(hex.substr(n, 2), 16)); 
		}
		return str;

	}

	var CryptoJS   = require('crypto-js');
	var forge      = require('node-forge');
	var utf8       = require('utf8');   
	key            = CryptoJS.MD5(utf8.encode(key)).toString(CryptoJS.enc.Latin1);
	key            = key + key.substring(0, 8); 
	var decipher   = forge.cipher.createDecipher('3DES-ECB', forge.util.createBuffer(key));
	encrypted_text = forge.util.decode64(encrypted_text);

	decipher.start({iv:''});
	decipher.update(forge.util.createBuffer(encrypted_text, 'utf-8'));
	decipher.finish();
	var decrypted = decipher.output; 
	return hTS( decrypted.toHex() ); 
}
module.exports = decrypt; 