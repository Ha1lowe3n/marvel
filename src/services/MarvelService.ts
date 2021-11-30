export class MarvelService {
    private _baseUrl = `https://gateway.marvel.com:443/v1/public`;
    private _apiKey = `apikey=69d88190cd71ff804d98f5a285ed6964`;

    public getResource = async (url: string) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`error fetch: ${res.status}`);
        }

        return res.json();
    };

    public getAllCharacteres = async () => {
        return await this.getResource(
            `${this._baseUrl}/characters?${this._apiKey}`
        );
    };

    public getCharacteres = async (characterId: number) => {
        return await this.getResource(
            `${this._baseUrl}/characters/${characterId}/${this._apiKey}`
        );
    };
}
