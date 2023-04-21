ls large/bg*.jpg | xargs -I{} basename {} | xargs -I{} convert -resize "2048x1600>" large/{} {}
ls bg*.jpg | xargs -I{} convert -resize 64x64^ -gravity center -crop 64x64+0+0 +repage {} thumb_{}
ls bg*.jpg | xargs -I{} convert -resize 128x128 {} lofi_{}
