source $HOME/.config/nvim/plug-config/coc.vim


set background=dark
set number relativenumber
set incsearch
set scrolloff=8
set hlsearch!
set nowrap
set encoding=UTF-8
set nocompatible
set t_Co=256                            " Support 256 colors
set splitbelow
set splitright
set expandtab
set tabstop=2
set cursorline
set showtabline
set nobackup
set nowritebackup
set termguicolors
set autochdir

let mapleader = "½" " map leader key

autocmd BufEnter *.tex set spell spelllang=en_US,da_dk
autocmd BufEnter *.md set spell spelllang=en_US,da_dk

call plug#begin()
Plug 'sheerun/vim-polyglot'
Plug 'nvim-lua/popup.nvim'
Plug 'nvim-lua/plenary.nvim'
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
Plug 'dense-analysis/ale'
Plug 'honza/vim-snippets'
Plug 'norcalli/nvim-colorizer.lua'
Plug 'thor1033/cake.vim'
call plug#end()


if (has("nvim"))
  "For Neovim 0.1.3 and 0.1.4 < https://github.com/neovim/neovim/pull/2198 >
  let $NVIM_TUI_ENABLE_TRUE_COLOR=1
endif

let g:vimtex_view_general_viewer = 'zathura'
"let g:airline_theme='solarized'
let g:shades_of_purple_airline = 1
let g:airline_powerline_fonts = 1

set conceallevel=1
let g:tex_conceal='abdmg'

nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

inoremap <C-l> <c-g>u<Esc>[s1z=`]a<c-g>u

nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>

nnoremap <M-j> :resize -2<CR>
nnoremap <M-k> :resize +2<CR>
nnoremap <M-h> :vertical resize -2<CR>
nnoremap <M-l> :vertical resize -2<CR>


inoremap ,, <C-o>A;
inoremap ½½ <C-o>o 

vnoremap < <gv
vnoremap > >gv

highlight clear signcolumn
hi Normal guibg=None ctermbg=None
" Find files using Telescope command-line sugar.
nnoremap <leader>ff <cmd>Telescope find_files<cr>
nnoremap <leader>fg <cmd>Telescope live_grep<cr>
nnoremap <leader>fb <cmd>Telescope buffers<cr>
nnoremap <leader>fh <cmd>Telescope help_tags<cr>



"ALE
let g:ale_linters = {
\ 'typescript': ['eslint', 'tsserver', 'typecheck'],
\ 'typescriptreact': ['eslint', 'tsserver', 'typecheck'],
\}

let g:ale_fixers = {
\   'javascript': ['prettier', 'eslint'],
\   'typescript': ['prettier', 'eslint'],
\   'typescriptreact': ['prettier', 'eslint'],
\}
colorscheme cake
