#!/bin/sh

if [ "$1" == "light" ]; then
  sed -i 's/^colors: .*/colors: \*Cake/g' ~/.config/alacritty/alacritty.yml
  sed -i 's/^set background=.*/set background=light/g' ~/.config/nvim/init.vim
else
  sed -i 's/^colors: .*/colors: \*CakeDark/g' ~/.config/alacritty/alacritty.yml
  sed -i 's/^set background=.*/set background=dark/g' ~/.config/nvim/init.vim
fi
