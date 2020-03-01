import catsData from './cats.json';

export function getCatsList() {
    const catsListData = catsData.map((element) => {
        return {
            id: element.id,
            name: element.name,
            originCountry: element.originCountry,
            foundationDate: element.foundationDate,
            wcfCategory: element.wcfCategory,
            imageUrl: element.imageUrl,
        };
    });

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(catsListData);
        }, 500);
    });
}

export function getCatInfo(id) {
    const catInfoData = catsData.find((element) => {
        return element.id === id;
    });

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(catInfoData);
        }, 500);
    });
}
