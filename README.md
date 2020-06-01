# Tyler's Dotfiles

## Install ZSH

https://github.com/robbyrussell/oh-my-zsh

## Clone Repo

```
cd ~
git clone https://github.com/tylerbuchea/.dotfiles.git
```

## Add to .zshrc

```
echo "source ~/.dotfiles/includes" >> ~/.zshrc
source ~/.zshrc
```

# Open dotfiles folder in VSCode

```
# Poke around to see all the available commands
dotfiles
```

## Credentials

```
# Copy credentials file and change them to your own
cp ~/.dotfiles/credentials_example ~/.dotfiles/credentials
```

## Plugins

```

# My plugins list in .zshrc
plugins=(git z)
```
