(function () {
    'use strict';

    angular
        .module("smartTree")
        .controller("arvore.controller", arvoreController);

    arvoreController.$inject = [
        '$rootScope',
        '$scope',
        '$compile',
        '$interpolate'
    ];

    function arvoreController($rootScope, $scope, $compile, $interpolate) {

        //Tooltip
        $(document).ready(function () {
            $("body").tooltip({   
                selector: "[data-toggle='tooltip']",
                container: "body"
            })
                .popover({
                selector: "[data-toggle='popover']",
                container: "body",
                trigger: "hover",
                html: true
            });
        });
        //Alerta
        $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });

        // Váriavel self passa a ser o controller
        var self = this;

        // Opções padrões do componente de árvore que utilizei
        self.treeOptions = {
            nodeChildren: "children",
            dirSelectable: true,
            injectClasses: {
                ul: "a1",
                li: "a2",
                liSelected: "a7",
                iExpanded: "a3",
                iCollapsed: "a4",
                iLeaf: "a5",
                label: "a6",
                labelSelected: "a8"
            }
        }

        //Carrega o código ao adicionar um novo item
        $scope.carregaAdd = function(selected){
            self.clothing = [];
            if($scope.selected != undefined){                
                self.clothing.codigo = $scope.selected.codigo + 1;
            }else{
                self.clothing.codigo = $scope.clothings.length + 1;
            }
        }
        // Adiciona um nó a árvore, podendo ser pai ou filho
        $scope.addProduct = function (clothing) {
            var clothingCopy = clothing.$$hashKey != undefined? angular.copy(clothing)  : clothing;
            var clothingObject = {
                codigo: clothingCopy.codigo,
                descricao: clothingCopy.descricao,
                observacao: clothingCopy.observacao,
                children: []
            };

            if ($scope.selected != undefined) {
                $scope.selected.children.push(clothingObject);
                $scope.expandedNodes.push($scope.selected);
            } else {
                $scope.clothings.push(clothingObject);
                $scope.expandedNodes.push($scope.clothings);
            }
            
            delete self.clothing;
        };

        // Alimenta o editar com as informações do node selecionado
        $scope.carregaEdit = function(selected){
            self.clothing = [];        
            self.clothing.codigo = selected.codigo;
            self.clothing.descricao = selected.descricao;
            self.clothing.observacao = selected.observacao;
            self.clothing.children = selected.children;
        }

        $scope.cancelEdit = function(controller){
            delete controller.clothing;
        }

        // Adiciona um nó a árvore, podendo ser pai ou filho
        $scope.editProduct = function (clothing) {
            var clothingCopy = clothing;
            var treeControlArray;

            var clothingObject = {
                codigo: clothingCopy.codigo,
                descricao: clothingCopy.descricao,
                observacao: clothingCopy.observacao,
                children: $scope.selected.children,
                $$hashKey: $scope.selected.$$hashKey
            };

            if ($scope.selected) {
                var compilar = $("treecontrol:first").html($compile(  '<treecontrol class="tree-light"'
                                                                   +  'tree-model="clothings"'
                                                                   +  'options="treeOptions"'
                                                                   +  'on-selection="showSelected(node, $parentNode)"'
                                                                   +  'expanded-nodes="expandedNodes"'
                                                                   +  'filter-expression="predicate"'
                                                                   +  'selected-node="selected">'
                                                                   +  '<span data-toggle="popover"'
                                                                   +  'data-placement="right"'
                                                                   +  'data-content="<b>Código:</b> {{node.codigo}} <br />'
                                                                   +  '<b>Descrição:</b> {{node.descricao}} <br />'
                                                                   +  '<b>Observação:</b> {{node.observacao}}">'
                                                                   +  '{{node.descricao}} </div>'
                                                                   +  '</treecontrol>')($scope));
                

                if($scope.$parentNode == undefined){
                    for (var i = 0; i < $scope.clothings.length; i++) {
                        var element = $scope.clothings[i];
                        
                        if(element.$$hashKey == $scope.selected.$$hashKey){  

                            $scope.clothings[i] = clothingObject;

                            // Compilar árvore
                            compilar;

                            $scope.selected = undefined;                            
                            break;
                        }                                  
                    }
                }else{
                    for (var i = 0; i < $scope.$parentNode.children.length; i++) {
                        var element = $scope.$parentNode.children[i];
                        
                        if(element.$$hashKey == $scope.selected.$$hashKey){
                            $scope.$parentNode.children[i] = clothingObject;

                            // Compilar árvore
                            compilar;

                            $scope.selected = undefined;
                            break;
                        }                    
                    }
                }
            };

            delete self.clothing;
        };


        $scope.buttonClick = function($event, node) {
            $scope.lastClicked = node;
            $event.stopPropagation();
        }

        $scope.iAmNotYourFather = function () {
            $scope.selected = undefined;
        }

        // Produtos Default
        $scope.clothings = [
            // Pai de todos
            {
                codigo: 1,
                descricao: "Campos Confecções",
                observacao: "Todas confeções de nossa empresa",
                children: [
                    {
                        codigo: 2,
                        descricao: "Bermudas",
                        observacao: "Todas bermudas de nossa empresa",
                        children: []
                    },
                    {
                        codigo: 3,
                        descricao: "Calças",
                        observacao: "Todas calças de nossa empresa",
                        children: [
                            {
                                codigo: 4,
                                descricao: "Sarja (m)",
                                observacao: "Todas calças sarja de nossa empresa",
                                children: []
                            },
                            {
                                codigo: 5,
                                descricao: "Social",
                                observacao: "Todas calças sociais de nossa empresa",
                                children: []
                            }
                        ]// Filhos das calças
                    },
                    {
                        codigo: 6,
                        descricao: "Camisas",
                        observacao: "Todas camisas de nossa empresa",
                        children: [
                            {
                                codigo: 7,
                                descricao: "Esporte",
                                observacao: "Todas camisas esporte de nossa empresa",
                                children: []
                            },
                            {
                                codigo: 8,
                                descricao: "Gola Polo",
                                observacao: "Todas camisas Gola Polo de nossa empresa",
                                children: []
                            },
                            {
                                codigo: 9,
                                descricao: "Grife",
                                observacao: "Todas camisas de grife de nossa empresa",
                                children: [
                                    {
                                        codigo: 10,
                                        descricao: "BOSS",
                                        observacao: "Todas camisas BOSS de nossa empresa",
                                        children: []
                                    }
                                ]// Filhos das Grifes
                            },
                            {
                                codigo: 11,
                                descricao: "Social",
                                observacao: "Todas camisas sociais de nossa empresa",
                                children: []
                            },
                        ]// Filhos das camisas
                    },
                    {
                        codigo: 12,
                        descricao: "Terno",
                        observacao: "Todos ternos de nossa empresa",
                        children: []
                    }
                ]// Filhos do pai de todos
            }];// $scope.clothings = [

            // Expandir todos filhos da árvore
            $scope.expandAll = function () {

                self.allNodes = [];
                self.addToAllNodes = function(children) {
                    //verifica se children ta vindo vazio
                    if (!children || typeof (children) == "array" && children.length == 0) {
                        return;
                    }      
                    //percorre todos filhos
                    for (var i = 0; i < children.length; i++) {
                        if(children[i].children.length > 0){
                                self.allNodes.push(children[i]);
                                self.addToAllNodes(children[i].children);
                            }
                    }
                }

                self.addToAllNodes($scope.clothings);
                $scope.expandedNodes = self.allNodes;

            };

            // Encolher tudo
            $scope.collapseAll = function () {
                $scope.expandedNodes = [];
            };

            // Deletar produto selecionado da árvore
            $scope.removeProduct = function () {
                
                /**
                 * Verifica todos os filhos do pai do elemento selecionado,
                 * caso a descricao de algum desses filhos for iguai a
                 * descricao do elemento selecionado, deleta ele com splice.
                 */
                if($scope.$parentNode == undefined){
                    for (var i = 0; i < $scope.clothings.length; i++) {
                        var element = $scope.clothings[i];
                        
                        if(element.descricao == $scope.selected.descricao){
                            $scope.clothings.splice(i,1);
                            $scope.selected = undefined;
                            break;
                        }                                  
                    }
                }else{
                    for (var i = 0; i < $scope.$parentNode.children.length; i++) {
                        var element = $scope.$parentNode.children[i];
                        
                        if(element.descricao == $scope.selected.descricao){
                            $scope.$parentNode.children.splice(i,1);
                            $scope.selected = undefined;
                            break;
                        }                    
                    }
                }       
                
            };

            // Função de carater informativo, onde teremos a informação do pai do filho selecionado
            $scope.showSelected = function (node, $parentNode) {
                $scope.$parentNode = $parentNode;
            };

            //expande a árvore ao filtrar
            $scope.$watch('predicate', function(newFilter) {
                if (newFilter && newFilter.length > 1) {
                    $scope.expandAll();
                } else {
                    $scope.expandedItems = [];
                }
            });
            
    }; //function arvoreController(self) {

})();