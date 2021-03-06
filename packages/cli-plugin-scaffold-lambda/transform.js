module.exports = function({ types: t, template: tpl }, { template, resourceName }) {
    return {
        visitor: {
            Identifier(path) {
                if (path.node.name === "resources") {
                    path.parent.value.properties = path.parent.value.properties.filter(
                        val => val.key.name !== resourceName
                    );

                    path.parent.value.properties.push(
                        t.objectProperty(
                            t.identifier(resourceName),
                            tpl.expression(template, { placeholderPattern: false })()
                        )
                    );
                }
            }
        }
    };
};
