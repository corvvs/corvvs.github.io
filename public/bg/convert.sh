ls bg*.jpg | xargs -I{} convert -resize 64x64^ -gravity center -crop 64x64+0+0 +repage {} thumb_{}
ls bg*.jpg | xargs -I{} convert -resize 128x128 {} lofi_{}
