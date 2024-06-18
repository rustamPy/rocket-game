'use server';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import rehypeHighlight from 'rehype-highlight';
import prettier from 'prettier';

export async function markdownToHtml(markdownPath) {

    try {
        const filePath = path.join(process.cwd(), 'public/leetcode_solutions/markdown', markdownPath);
        console.log(filePath)
        const fileContents = fs.readFileSync(filePath, 'utf8');

        const processedContent = await remark()
            .use(html)
            .use(rehypeHighlight) // Add syntax highlighting
            .process(fileContents);

        const contentHtml = processedContent.toString();

        console.log(contentHtml)

        const beautifiedHtml = prettier.format(contentHtml, { parser: 'html' });

        return beautifiedHtml;
    }
    catch {
        return null;
    }
}