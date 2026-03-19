#!/bin/bash
export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
export NODE_PATH="/opt/homebrew/lib/node_modules"
cd /Users/sergio/Projects/gdc2026
exec /opt/homebrew/bin/node node_modules/.bin/next dev
