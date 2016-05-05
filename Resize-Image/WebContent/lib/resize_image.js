/**
 * 画像を500KBまでリサイズ
 */
var resize_image_to_500KB = function(origin_image_data) {
	var resize = function(origin_image_data) {
		// KBサイズを取得
		var size_KB = Math.ceil(byte_to_KB(image_utils
				.get_file_size_from_dataURI(origin_image_data)));

		// どれくらい縮小するか
		var resize_scale = 1.0;
		switch (true) {
		// 500KB以下.変換の必要なし
		case size_KB < 500:
			return origin_image_data;
			break;
		// 500KB～700KB
		case size_KB < 700:
			resize_scale = 0.9;
			break;
		// 700KB～1000KB
		case size_KB < 1000:
			resize_scale = 0.8;
			break;
		// 1000KB～5000KB
		case size_KB < 5000:
			resize_scale = 0.7;
			break;
		// 5000KB～10000KB
		case size_KB < 5000:
			resize_scale = 0.6;
			break;
		default:
			resize_scale = 0.5;
		}

		var image = new Image();
		image.src = origin_image_data;

		// 縮小率の設定
		var resize_width = Math.floor(image.width * resize_scale);
		var resize_height = Math.floor(image.height * resize_scale);

		// 縮小
		var canvas = document.createElement('canvas');
		canvas.width = resize_width;
		canvas.height = resize_height;
		var context = canvas.getContext('2d');
		context.drawImage(image, 0, 0, resize_width, resize_height);

		// jpegの品質保持（1.0が最高）
		var resize_data = canvas.toDataURL("image/jpeg", 0.9);

		// for debug
		var resize_size_KB = Math.ceil(image_utils.byte_to_KB(image_utils
				.get_file_size_from_dataURI(resize_data)));
		console.log("org width : " + image.width);
		console.log("org height : " + image.height);
		console.log("org kb : " + size_KB);
		console.log("resize width : " + resize_width)
		console.log("resize height : " + resize_height)
		console.log("resize kb : " + resize_size_KB);

		return resize_size_KB <= 500 ? resize_data : resize(resize_data);
	};
	return resize(origin_image_data);
};