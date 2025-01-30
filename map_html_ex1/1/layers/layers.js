var wms_layers = [];


        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_border_dkz_1 = new ol.format.GeoJSON();
var features_border_dkz_1 = format_border_dkz_1.readFeatures(json_border_dkz_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_border_dkz_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_border_dkz_1.addFeatures(features_border_dkz_1);
var lyr_border_dkz_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_border_dkz_1, 
                style: style_border_dkz_1,
                popuplayertitle: 'border_dkz',
                interactive: false,
    title: 'border_dkz<br />\
    <img src="styles/legend/border_dkz_1_0.png" /> 1<br />\
    <img src="styles/legend/border_dkz_1_1.png" /> 2<br />\
    <img src="styles/legend/border_dkz_1_2.png" /> 3<br />\
    <img src="styles/legend/border_dkz_1_3.png" /> 4<br />\
    <img src="styles/legend/border_dkz_1_4.png" /> 5<br />\
    <img src="styles/legend/border_dkz_1_5.png" /> 6<br />\
    <img src="styles/legend/border_dkz_1_6.png" /> 7<br />\
    <img src="styles/legend/border_dkz_1_7.png" /> 8<br />\
    <img src="styles/legend/border_dkz_1_8.png" /> 9<br />\
    <img src="styles/legend/border_dkz_1_9.png" /> 10<br />\
    <img src="styles/legend/border_dkz_1_10.png" /> 11<br />\
    <img src="styles/legend/border_dkz_1_11.png" /> 12<br />\
    <img src="styles/legend/border_dkz_1_12.png" /> <br />'
        });

lyr_OSMStandard_0.setVisible(true);lyr_border_dkz_1.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr_border_dkz_1];
lyr_border_dkz_1.set('fieldAliases', {'id': 'id', 'zone': 'zone', 'sub_zone': 'sub_zone', 'Name': 'Name', });
lyr_border_dkz_1.set('fieldImages', {'id': '', 'zone': '', 'sub_zone': '', 'Name': '', });
lyr_border_dkz_1.set('fieldLabels', {'id': 'no label', 'zone': 'no label', 'sub_zone': 'no label', 'Name': 'no label', });
lyr_border_dkz_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});