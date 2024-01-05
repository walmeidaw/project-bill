const { safeStorage } = require('electron');

function serialization( data ) {
    if (safeStorage.isEncryptionAvailable()) {
        const buffer = safeStorage.encryptString(data)
        return buffer;
    }
}

function deserialization( buffer ) {
    if (safeStorage.isEncryptionAvailable()) {
        const data = safeStorage.decryptString(buffer)
        return data;
    }
}

module.exports = { serialization, deserialization }