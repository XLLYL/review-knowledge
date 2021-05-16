const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'index.js',
	path: path.resolve(__dirname, 'docs'),
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