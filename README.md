# Tyler's Dotfiles

## The Coolest

### Install iTerm2
https://www.iterm2.com/

### Install ZSH
https://github.com/robbyrussell/oh-my-zsh

### Add Theme
https://github.com/wesbos/Cobalt2-iterm

### Clone Repo into ~

```
cd ~
git clone https://github.com/tylerbuchea/.dotfiles.git

# Check stuff out
atom ~/.dotfiles
# OR
subl ~/.dotfiles
```

### Add to .zshrc

```
echo "source ~/.dotfiles/.includes" >> ~/.zshrc
source ~/.zshrc
```

### Add .credentials

**Copy credentials and change them to your own**

```
cp ~/.dotfiles/.credentials_example ~/.dotfiles/.credentials
```

### Plugins

**My plugins list in .zshrc**

```
plugins=(git z)
```

### Why ZSH?
**Cuz this:**

http://www.slideshare.net/jaguardesignstudio/why-zsh-is-cooler-than-your-shell-16194692
