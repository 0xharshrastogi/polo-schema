format=$1

if [ -z "$format" ]; then
    echo "Please specify a format: cjs, esm"
    exit 1
fi

if [ "$format" != "cjs" ] && [ "$format" != "esm" ]; then
    echo "Invalid format: $format"
    exit 1
fi

module="tsconfig.$format.json"
package_json_content=""

if [ "$format" == "cjs" ]; then
    package_json_content='{
     "type": "commonjs"
}'
fi

if [ "$format" == "esm" ]; then
    package_json_content='{
     "type": "module"
}'
fi

if [ -z "$package_json_content" ]; then
    echo "Error: package_json_content is empty"
    exit 1
fi

echo "Building $format format ..."

rm -rf dist/$format
mkdir -p dist/$format
echo $package_json_content >dist/$format/package.json
pnpm tsc -p tsconfig.$format.json

# tsc -p tsconfig.cjs.json
