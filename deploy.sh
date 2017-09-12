#!/bin/bash
git push
ssh dlhaselgrove@shell.willamette.edu "cd public_html && git pull"
