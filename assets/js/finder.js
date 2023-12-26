new Vue({
  data(){
    return{
      estado: '',
      promos: [],
    }
  }, 

  computed:{
    //Get country from the url
    country: function(){
        var urlParams = new URLSearchParams(window.location.search);
        var pais = '';

        if(urlParams.get('pais')){
            pais = urlParams.get('pais')

        }else {
            pais = 'SV'
        }
        
        return pais.toUpperCase();
    },

    currency: function(){
        var urlParams = new URLSearchParams(window.location.search);
        var currency = '';

        if(urlParams.get('pais')){
            pais = urlParams.get('pais')
            
            if(pais == 'sv'){
                currency = '$'
            }else if (pais == 'ni'){
                currency = 'C$'
            }else if (pais == 'cr'){
                currency = '₡'
            }else if (pais == 'gt'){
                currency = 'Q'
            }

        }else {
            currency = '$'
        }

        return currency;
    },
    

    filterList(){
        var vm = this, promos = vm.promos;
            return _.filter(promos, function(query){
                var estado = vm.estado ? (query.estado == vm.estado) : true;
                return estado
            })
        }
    },

    mounted(){

        fetch('assets/js/data7.json')
        .then(response => response.json())
        .then(data => (
            //Filter by Pais
            this.promos = data.filter((promo) => {
                if(promo.Pais == this.country){
                    if(promo.Estado === 'activo' || promo.Estado === 'activa' || promo.Estado === 1){
                        return (
                            promos = promo,
                            promos.url = (promos.url) ? promo.url.replace('sv', this.country).toLowerCase() : false,
                            promos.Precio_regular = (promos.Precio_regular) ? this.currency+promos.Precio_regular : false,
                            promos.Precio_promocion = (promos.Precio_promocion) ? this.currency+promos.Precio_promocion : false
                        );
                    }
                }
            })
        ))
        .catch(error => console.error(error))
    }

}).$mount('#app')
