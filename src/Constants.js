const PARAMS = {
  API_URL: "http://sym.test/api/",
  IMAGE_URL: "http://sym.test",
  SORT:[
	{ value: 'title-asc', label: 'по возрастанию' },
	{ value: 'title-desc', label: 'по убыванию' },
	{ value: 'price-asc', label: 'от дешевых' },
	{ value: 'price-desc', label: 'от дорогих' },
  ],
  DELIVERY_TYPES:[
	{ value: 'ukr_post', label: 'Укрпочта' },
	{ value: 'nova_pochta', label: 'Новая почта' },
  ],
  DELIVERY_PRICE:{
	 ukr_post: 12,
	 nova_pochta: 35 
	},
  API_KEY_NP:"18d6ba4ce03c3a3afe7f544691058f68"
}

export default PARAMS;