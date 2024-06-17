'use client';
import { useState } from 'react';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';

export default function MarkdownConverter() {
    const [input, setInput] = useState('');
    const [markdownOutput, setMarkdownOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const convertMarkdown = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: input }),
            });

            if (!response.ok) {
                throw new Error('Conversion failed');
            }

            const data = await response.json();
            setMarkdownOutput(data.markdown);
        } catch (error) {
            console.error('Error:', error);
            setMarkdownOutput('Error during conversion.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <InputGroup className={'mb-3'}>
                <FormControl
                    as="textarea"
                    placeholder="Enter your text..."
                    aria-label="With textarea"
                    value={input}
                    onChange={handleInputChange}
                />
            </InputGroup>
            <Button onClick={convertMarkdown} variant="primary" disabled={loading}>
                {loading ? 'Loading...' : 'Convert to Markdown'}
            </Button>

            <div className="mt-4">
                <h3>Markdown Output:</h3>
                <pre>{markdownOutput}</pre>
            </div>
        </div>
    );
}