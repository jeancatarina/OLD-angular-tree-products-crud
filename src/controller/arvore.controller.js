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

        // Adiciona um nó a árvore, podendo ser pai ou filho
        $scope.addProduct = function (clothing) {
            var clothingCopy = angular.copy(clothing);
            var clothingObject = {
                codigo: clothingCopy.codigo,
                descricao: clothingCopy.descricao,
                observacao: clothingCopy.observacao,
                children: []
            };

            if ($scope.selected != undefined) {
                $scope.selected.children.push(clothingObject);
            } else {
                $scope.clothings.push(clothingObject);
            }

            delete self.clothing;
        };

        $scope.carregaEdit = function(selected){
            
        }

        // Adiciona um nó a árvore, podendo ser pai ou filho
        $scope.editProduct = function (clothing) {
            var clothingCopy = angular.copy(clothing);
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
                $scope.expandedNodes = [];
                $scope.expandedNodes.push($scope.clothings[0]);
                $scope.clothings[0].children.forEach(function (element) {
                    $scope.expandedNodes.push(element);
                }, this);
                $scope.expandedNodes.push($scope.clothings[0].children[2].children[2]);

                /////////
                
                // Verifica todos pais e expandi eles
                for (var i = 0; i < $scope.clothings.length; i++) {
                    $scope.expandedNodes.push($scope.clothings[i]);                    
                    //Esse pai tem filho?
                    if($scope.clothings[i].children != undefined){
                        //percorre todos os filhos e expandi eles
                        for (var i = 0; i < $scope.clothings[i].children.length; i++) {
                            $scope.expandedNodes.push($scope.clothings[i].children[i]);
                            
                        }

                    }
                }



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
            
    }; //function arvoreController(self) {

})();