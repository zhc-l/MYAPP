<template>
    <z-form :settings="option"></z-form>
</template>
<script>
// import { RESTFul } from "@/http/index.js"
// const service = RESTFul('api/user')
import zForm from '@/components/Form/Form.vue'
export default{
    components:{
        zForm
    },
    data () {
        return {
            option:{
                // proxy: {
                //     ajax: {
                //         create: service.create
                //     },
                // },
                items:[
					{
						name:"姓名",
						field:'name',
                        type:'input',
                        default:'',
					},
                    {
						name:"性别",
						field:"sex",
                        type:'select',
                        multiline:false,
                        items:[
                            {
                                name:'男',
                                value:'1'
                            },
                            {
                                name:'女',
                                value:'2'
                            },
                            {
                                name:'未知',
                                value:'3'
                            }
                        ]
					},
                    {
                        name:"爱好",
                        field:"hobby",
                        type:'select',
                        multiline:true,
                        items:[
                            {
                                name:'篮球',
                                value:'1'
                            },
                            {
                                name:'足球',
                                value:'2'
                            },
                            {
                                name:'乒乓球',
                                value:'3'
                            }
                        ]
                    },
                    {
                        name:"生日",
                        field:"birthday",
                        type:'date',
                        default:'',
                    },
                    {
                        name:"头像",
                        field:"avatar",
                        type:'upload',
                        default:'',
                    },
                    {
                        name:"简介",
                        field:"desc",
                        type:'textarea',
                        default:'',
                    },
                    
				],

            }
        }
    }
}
</script>