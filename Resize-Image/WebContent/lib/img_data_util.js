/**
 * 適当な画像処理のユーティリティ
 */
var image_utils = function(){};

// DATAURIから画像サイズを計算して返却する（B単位）
image_utils.get_file_size_from_dataURI = function(dataURL) {
	var dataURL_size = dataURL.length;
	// dataURIの形式は「data:image/jpeg;base64,」のような形式
	// なので、「,」以前はメタデータ
	dataURL_size = dataURL_size - dataURL.indexOf(",");

	// base64エンコードだから6bit分を8bit使うということ
	// 1バイトに満たないあまりはパディングされてる
	return Math.floor((dataURL_size + 2) * 3) / 4;
};

// 小数点2桁で四捨五入
image_utils.format_round_to = function(num) {
	return (Math.round(num * 100)) / 100;
};

// byteからKbyte変換
image_utils.byte_to_KB = function(b_size) {
	return b_size / 1024;
};

// byteからMbyte変換
image_utils.byte_to_MB = function(b_size) {
	return b_size / 1024 / 1024;
};