+++
title = "Take Pacman Warnings Seriously"
description = "Especially when the kernel is upgraded!"
slug = "../Take-Pacman-Warnings-Seriously"
author = "Lobo"
comments = "true"
date = "2024-11-22"
categories = ["1"]
tags = ["ArchLinux", "Linux", "Pacman", "VirtualBox", "Packer", "Vagrant", "VMDK", "initramfs"]
+++

Take pacman Warnings seriously esp. when kernel is upgraded!

I have Packer and Vagrant setup to create arch Linux virtual machines. I create new VMs for various tasks and throw them out once done. I do have one or two VMs that I just keep long term. One of those VMs didn't boot up after an update. `pacman -Syuu` updated many packages and the kernel was upgraded to 6.11.8. I remember catching some warning in the corner of my eye as I was closing the terminal. I didn't think much about it and went about my business until I tried to boot it up.

Typically, I'd just discard the VM but I needed to get something out of the VM so down the rabbit hole I went.

The VM boot process just hung with the following text:

```text
Booting 'Arch Linux'
Loading Linux linux ...
Loading initial ramdisk ...
ata1.00 read log 0x00 page 0x00 failed, Emask 0x1
```

I couldn't get any good leads on the read log failed message; however, I did come across pages that mentioned that this is a warning message and can be ignored. I tried boot from fallback option but same result.

I thought the VirtualBox software upgrade which I had just done the same day may have broken the VM so I deleted the machine and recreated it with the same VMDK. I should have noted down the settings before deleting but oops! I just went with whatever I felt is right.  I rebooted the VM to the same message: `ata1.00 read log 0x00 page 0x00 failed, Emask 0x1` and it just stuck there.

I downgraded the VirtualBox, unchecked solid-state checkbox, disabled 3D acceleration etc. but nothing helped.  I did fool around a little bit with VirtualBox settings such as AHCI, SATA, USB controller etc. and the boot now started hanging after `Loading initial ramdisk ...`

I didn’t change anything on the VM disk. I couldn’t have because the VM never booted. In any case, I decided to investigate the hard disc. I opened the VMDK file up in 7zip but the .img files failed to open with `Couldn’t Mount File: The disc image file is corrupted.` error. That didn't sound good, and I was about to give up but then decided to add the VMDK image as a second disk to another working VM. Let’s call that backup VM.

I could have booted my broken VM from an Arch ISO, mounted the disk, `arch-chroot` and `pacman -S linux` to fix the boot issue. Since I never attached a VMDK as disk to another VM, I decided to give that a go first.

I created a backup copy of the broken VMDK just in case I end of destroying the original. I tried to add that copy to VirtualBox media manager (Ctrl+D) but it complained that the UUID is already taken so I changed the UUID using the command: `.\VBoxManage.exe internalcommands sethduuid arch-copy.vhdk`

I shouldn't have changed UUID. You will see why below. Anyway, I added the VMDK as hard disk. I picked a backup VM (with kernel 6.10.5 I believe) and added the broken VMDK as the second hard disk and booted it up. Once in the machine, I found the device label using `lsblk` and mounted it to `/mnt`. I did `chroot` but `pacman -S linux` was throwing some block device related error. `arch-chroot` does setup a few things before chrooting but I didn't want to spend more time than I already did so I exited `chroot`.

I knew grub printed the “loading” message so I went to `/mnt/boot/grub/grub.cfg` (notice `/mnt` at the beginning) and it looked ok. The UUID mentioned matched with the UUID from `sudo blkid`. Then I noticed that the initramfs files were zero byte! I have no idea how that could be. I suspect that in a rush I powered off the VM and the file wasn't written to the disk. I had the storage controller with `Use Host I/O cache` enabled which may have not yet written to the file. I don't like the fact that VirtualBox defaults the close dialog to whatever was used last in any vm! I had powered off some other VMs that were hung just before so when I closed the VM and pressed ok, the setting must have been on power off rather than send shutdwon signal.

I copied the initramfs files from the backup VM to the hard disk of the broken VM that I had mounted.

```bash
sudo cp /boot/initramfs-linux.img /mnt/boot/initramfs-linux.img
sudo cp /boot/initramfs-linux-fallback.img /mnt/boot/initramfs-linux-fallback.img
```

I shutdown the backup VM and removed the extra disk from it. Then I detached the VMDK from the broken VM and attached the one I had just copied initramfs into as the disk. The boot process moved past loading the initramfs but it dropped me down into an emergency shell!

```text
ERROR: device 'UUID=xxx-xxx-xxx-xxx' not found. Skipping fsck.
mount: /new_root: can't find UUID=xxx-xxx-xxx-xxx.
ERROR: Failed to mount 'UUID=xxx-xxx-xxx-xxx' or real root.
You are now being dropped into an emergency shell.
sh: can't access tty: job control turned off
[rootfs ~]#
```

Unfortunately, this terminal is untouchable! It doesn't register any keystrokes as it clearly indicates so it was useless and I had to power it down. This UUID error was why I shouldn't have changed the UUID of the VMDK. I should have removed the disk from the broken VM and removed the disk from the VirtualBox and then added the copy. Or just left the copy outside and attached the broken disk directly backup VM. What surprised me is that the UUID in the `grub.conf` was same as the UUID shown by `blkid`. I didn’t want to go down that rabbit hole!

I decided to delete the copy with changed UUID and start over. I backed up the broken VMDK, added the original back into VirtualBox, and then into the broken VM as well as a backup VM. I booted up the backup VM, this time I decided to update the backup VM with `pacman -Syuu` which installed kernel 6.11.9. I coped the initramfs over the broken VMDK disk which had 6.11.8.

That was it! I was able to successfully boot up the broken VM. I then updated the system with `arch_update` (which is an alias for `yay -Syuu && paccache -r && paccache -ruk0`) and I noticed the warning again. This time I paid attention!

The warning was about the preset file `/etc/mkinitcpio.d/linux.preset` being empty. It indeed was a zero-byte file.  I then checked `/boot` and found that unlike the last time where the initramfs files were both zero-byte, this time they were both gone. [Kernel upgrade should generate](https://wiki.archlinux.org/title/Mkinitcpio#Automated_generation) the preset file if it is not there but for some reason, if it exist as a zero-byte file, it doesn't regenerate it and throws a warning. I ended up deleting the preset file and reinstalled the kernel using `pacman -S linux`. This created the preset file and the initramfs files were back again!

I rebooted the VM but found that all Gnome applications were big unusable unreadable white banners. Just white windows with nothing visible in it! I had to disable the 3D acceleration for them to work properly. I then cleaned up all the mess I had made.

After dealing with all this, I’m leaning towards creating a backup process to back up the home directory to the Vagrant shared folder. I could run it as a cronjob or just update the `arch_update` alias to backup before upgrade. This would work if I don’t make modifications to the VM directly and always make them in the Packer + Vagrant scripts. I can then just spin up a new VM and copy over the home directory from the backup. Alternatively, I can have another disk mounted as home and avoid the aforementioned scripting work but I would have to update Packer + Vagrant setup to duplicate the home disk, change UUID, and mount that as home while creating new VMs. That would break the ephemeral VM idea I suppose. I think I will save this for some other day!
