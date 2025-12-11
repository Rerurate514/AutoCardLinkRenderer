import { Html } from 'mdast';
import { visit } from "unist-util-visit"
import { QuartzTransformerPlugin } from "../types"
import { CSSResource } from '../../util/resources';
import cardlinkStyle from "../../components/styles/autoCardLink.inline.scss"

const urlPrefix = "url: "
const titlePrefix = "title: \""
const descriptionPrefix = "description: \""
const hostPrefix = "host: "
const faviconPrefix = "favicon: "
const imagePrefix = "image: "

export const AutoCardLinkRenderer: QuartzTransformerPlugin = () => {
    return {
        name: "AutoCardLinkRenderer",
        externalResources() {
            const js: any[] = []
            const css: CSSResource[] = []

            css.push({
                content: cardlinkStyle,
                inline: true,
            })

            return { js, css }
        },
        markdownPlugins() {
            return [
                () => {
                    return (tree, _file) => {
                        visit(tree, "code", (node, index, parent) => {
                            if (node.lang === "cardlink") {
                                const content: string[] = node.value.split("\n")

                                const url = content.find(line => line.startsWith(urlPrefix)) 
                                    ? removePrefix(content.find(line => line.startsWith(urlPrefix))!, urlPrefix) 
                                    : "";
                                const title = content.find(line => line.startsWith(titlePrefix)) 
                                    ? removePrefix(content.find(line => line.startsWith(titlePrefix))!, titlePrefix).replace(/"/g, "") 
                                    : "";
                                const description = content.find(line => line.includes(descriptionPrefix)) 
                                    ? removePrefix(content.find(line => line.includes(descriptionPrefix))!, descriptionPrefix).replace(/"/g, "") 
                                    : "";
                                const host = content.find(line => line.startsWith(hostPrefix)) 
                                    ? removePrefix(content.find(line => line.startsWith(hostPrefix))!, hostPrefix) 
                                    : "";
                                const favicon = content.find(line => line.startsWith(faviconPrefix)) 
                                    ? removePrefix(content.find(line => line.startsWith(faviconPrefix))!, faviconPrefix) 
                                    : "";
                                const image = content.find(line => line.startsWith(imagePrefix)) 
                                    ? removePrefix(content.find(line => line.startsWith(imagePrefix))!, imagePrefix) 
                                    : "";

                                const newHtmlNode: Html = (() => {
                                    if (favicon && image) {
                                        return {
                                            type: "html",
                                            value: `
                                                <a href="${url}" class="cardlink-box" target="_blank" rel="noopener noreferrer">
                                                    <div class="cardlink-contents">
                                                        <img class="cardlink-image" src="${image}" alt="${host}"></img>
                                                        <div class="cardlink-content">
                                                            <div class="cardlink-title">${title}</div>
                                                            <div class="cardlink-description">${description}</div>
                                                            <div>
                                                                <img class="cardlink-favicon" src="${favicon}" alt="${host}"></img>
                                                                <span class="cardlink-host">${host}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            `,
                                        }
                                    } else if (favicon) {
                                        return {
                                            type: "html",
                                            value: `
                                                <a href="${url}" class="cardlink-box" target="_blank" rel="noopener noreferrer">
                                                    <div class="cardlink-contents">
                                                        <div class="cardlink-content">
                                                            <div class="cardlink-title">${title}</div>
                                                            <div class="cardlink-description">${description}</div>
                                                            <div>
                                                                <img class="cardlink-favicon" src="${favicon}" alt="${host}"></img>
                                                                <span class="cardlink-host">${host}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            `,
                                        }
                                    } else if (image) {
                                        return {
                                            type: "html",
                                            value: `
                                                <a href="${url}" class="cardlink-box" target="_blank" rel="noopener noreferrer">
                                                    <div class="cardlink-contents">
                                                        <img class="cardlink-image" src="${image}" alt="${host}"></img>
                                                        <div class="cardlink-content">
                                                            <div class="cardlink-title">${title}</div>
                                                            <div class="cardlink-description">${description}</div>
                                                            <span class="cardlink-host">${host}</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            `,
                                        }
                                    } else {
                                        return {
                                            type: "html",
                                            value: `
                                                <a href="${url}" class="cardlink-box" target="_blank" rel="noopener noreferrer">
                                                    <div class="cardlink-contents">
                                                        <div class="cardlink-content">
                                                            <div class="cardlink-title">${title}</div>
                                                            <div class="cardlink-description">${description}</div>
                                                            <span class="cardlink-host">${host}</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            `,
                                        }
                                    }
                                })()

                                if (parent && index !== undefined) {
                                    parent.children.splice(index, 1, newHtmlNode)
                                }
                            }
                        })
                    }
                },
            ]
        },
    }

    function removePrefix(text: string | undefined, prefix: string): string {
        if (!text) return ""
        if (text.startsWith(prefix)) {
            return text.substring(prefix.length);
        }

        return text;
    }
}
