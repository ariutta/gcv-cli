# `gcv-cli`: Node.js CLI Utility for Google Cloud Vision

## Installation

```
git clone https://github.com/ariutta/gcv-cli.git
cd gcv-cli
npm install
```

Add your API key for Google Cloud Vision to your .bashrc:

```
echo "GCV_API_KEY=YOUR_API_KEY" >> ~/.bashrc
```

Run from command line with a file path:
```
node gcv-cli.js easy-sample-pathway.jpg
```

or a URL:

```
node gcv-cli.js https://upload.wikimedia.org/wikipedia/commons/f/fb/Signal_transduction_pathways.png
```

TODO: publish to npm so this works:
```
npm install -g gcv-cli
echo "GCV_API_KEY=YOUR_API_KEY" >> ~/.bashrc
gcv easy-sample-pathway.jpg
```
