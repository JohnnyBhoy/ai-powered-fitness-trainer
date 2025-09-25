<?php

namespace App\Services;

use GuzzleHttp\Client as GuzzleClient;

class AiService
{
    /**
     * Summary of extractAiResponse
     * @param mixed $systemPrompt
     * @param mixed $userPrompt
     */
    public function get($systemPrompt, $userPrompt): mixed
    {
        $apiKey = config('services.openai.api_key');
        $client = new GuzzleClient();

        $response = $client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $userPrompt],
                ],
                'max_tokens' => 4096,
            ]
        ]);

        $response = json_decode($response->getBody()->getContents(), true);
        return  $response['choices'][0]['message']['content'];
    }

    /**
     * Summary of extractArrayOfDataInAiResponse
     * @param mixed $response
     */
    public function extractArrayOfDataInAiResponse($response): mixed
    {
        $start = strpos($response, '[');
        $end   = strrpos($response, ']') + 1;
        $response = substr($response, $start, $end - $start);
        return json_decode($response, true);
    }
}
