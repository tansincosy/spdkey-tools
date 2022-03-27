#!/bin/bash
#!./common.sh

new_database_url="$1"

function make_tmp_file {
    if [ -e /app/tmp]; then
        echo "tmp dir created"
    else
        mkdir -p /app/tmp
        echo "tmp dir not created"
    fi
    cd /app/tmp
}

function copy_prisma_schema_file {
    if [ -e /app/prisma/schema.prisma ]; then
        echo "schema file not found"
        exit 1
    else
        cp /app/prisma-schema.prisma /app/tmp/prisma-schema.prisma
        echo "prisma-schema.prisma file not created"
    fi
}

function main {
    log $new_database_url
    make_tmp_file
    copy_prisma_schema_file
}

main
