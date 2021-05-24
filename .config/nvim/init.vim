set number relativenumber
set incsearch
set scrolloff=8
set hlsearch!
set nowrap
set encoding=UTF-8
set nocompatible

call plug#begin()
Plug 'sheerun/vim-polyglot'
Plug 'nvim-telescope/telescope.nvim'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'Junegunn/fzf.vim'
Plug 'mhinz/vim-startify'
Plug 'jiangmiao/auto-pairs'
Plug 'lervag/vimtex'
Plug 'preservim/nerdtree'
Plug 'ryanoasis/vim-devicons'
Plug 'tiagofumo/vim-nerdtree-syntax-highlight'
call plug#end()


let g:vimtex_view_general_viewer = 'zathura'
let g:airline_theme='term'
let g:airline_powerline_fonts = 2
let g:Tex_FoldedSections = 'part|addpart,chapter|addchap,section|addsec,subsection,subsubsection,paragraph,subparagraph'

nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l
nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>

