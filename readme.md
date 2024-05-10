localhostUrl: localhost:6002/discount-module

JSON to call api
{
    "items": [
        {
            "item_name": "T-shirt",
            "item_category": "Clothing",
            "price": 350
        },
        {
            "item_name": "Ring",
            "item_category": "Accessories",
            "price": 250
        },
        {
            "item_name": "Watch",
            "item_category": "Accessories",
            "price": 850
        },
        {
            "item_name": "Microwave",
            "item_category": "Electronics",
            "price": 2500
        }
    ],
    "discount": [
        {
            "campaign_name": "Fixed amount",
            "campaign_parameter": 50
        },
        {
            "campaign_name": "Percentage discount by item category",
            "campaign_parameter": ["Clothing", 15]
        },
        {
            "campaign_name": "Special campaigns",
            "campaign_parameter": [300, 40]
        }
    ]
}