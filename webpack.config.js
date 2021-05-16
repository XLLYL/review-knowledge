const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
	path: path.resolve(__dirname),
  },
	module: {
		rules: [
			{
				test: /\.md$/i,
				use: 'raw-loader',
			},
		],
	}
};