#!/bin/bash

INPUT=$1
DEST=$2

if [ -z "$DEST" ]; then
	echo "Parametros: arquivo html de entrada, pasta de destino"
	exit 1
fi

mkdir $DEST
cp -r _site $DEST/mata56
cp _PROCEDIMENTO_PROVA.md $DEST/mata56
oldpwd=`pwd`

cd $DEST/mata56
rm list.php load.php
rm *.html
cp $oldpwd/$1 index.html
cd $oldpwd
