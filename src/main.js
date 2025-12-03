/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
   // @TODO: Расчет выручки от операции

   const { discount, sale_price, quantity } = purchase;
   return (sale_price * (1 - (discount / 100))) * quantity;
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
    // @TODO: Расчет бонуса от позиции в рейтинге

}

function getSellerRevenue(seller, purchases, products) {
    const sellerPurchases = purchases.filter(x => x.seller_id === seller.id);

    let revenue = 0;
    sellerPurchases.forEach(purchase => {
        revenue = revenue + purchase.items.reduce((acc, item) => {
            acc += calculateSimpleRevenue(item, products.find(x => x.sku === item.sku));
            return acc;
        }, 0)
    });

    console.log(sellerPurchases);

    return revenue;
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
    let seller = data.sellers[3];

    // console.log(getSellerRevenue(seller, data.purchase_records, data.products));

    // @TODO: Проверка входных данных

    // @TODO: Проверка наличия опций

    // @TODO: Подготовка промежуточных данных для сбора статистики
    const sellerStats = data.sellers.map(seller => ({
    // Заполним начальными данными
        id: seller.id,
        name: `${seller.first_name} ${seller.last_name}`,
        revenue: 0,
        profit: 0,
        sales_count: 0,
        products_sold: {}
    }));

    // console.log(sellerStats);

    // @TODO: Индексация продавцов и товаров для быстрого доступа
    // Ключом будет id, значением — запись из sellerStats
    const sellerIndex = Object.fromEntries(sellerStats.map(item => [item.id, item]));

    // console.log(sellerIndex);

    // Ключом будет sku, значением — запись из data.products
    const productIndex = data.products.reduce((result, item) => ({
        ...result, 
        [item.sku]: item
    }), {});

    // console.log(productIndex);

    // @TODO: Расчет выручки и прибыли для каждого продавца

    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями
}
