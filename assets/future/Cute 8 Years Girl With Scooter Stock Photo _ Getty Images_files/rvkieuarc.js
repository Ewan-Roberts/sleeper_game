



/* ControlTag Loader for Getty Images 6d5b4ec0-7a06-4e4f-a030-61a37ac8ddf6 */
(function(w, cs) {
  
  if (/Twitter for iPhone/.test(w.navigator.userAgent || '')) {
    return;
  }

  var debugging = /kxdebug/.test(w.location);
  var log = function() {
    
    debugging && w.console && w.console.log([].slice.call(arguments).join(' '));
  };

  var load = function(url, callback) {
    log('Loading script from:', url);
    var node = w.document.createElement('script');
    node.async = true;  
    node.src = url;

    
    node.onload = node.onreadystatechange = function () {
      var state = node.readyState;
      if (!callback.done && (!state || /loaded|complete/.test(state))) {
        log('Script loaded from:', url);
        callback.done = true;  
        callback();
      }
    };

    
    var sibling = w.document.getElementsByTagName('script')[0];
    sibling.parentNode.insertBefore(node, sibling);
  };

  var config = {"app":{"name":"krux-scala-config-webservice","version":"3.36.0","schema_version":3},"confid":"rvkieuarc","context_terms":[],"publisher":{"name":"Getty Images","active":true,"uuid":"6d5b4ec0-7a06-4e4f-a030-61a37ac8ddf6","version_bucket":"stable","id":2480},"params":{"link_header_bidder":false,"site_level_supertag_config":"site","recommend":false,"control_tag_pixel_throttle":100,"fingerprint":false,"optout_button_optout_text":"Browser Opt Out","user_data_timing":"load","consent_active":true,"use_central_usermatch":true,"store_realtime_segments":false,"tag_source":false,"link_hb_start_event":"ready","optout_button_optin_text":"Browser Opt In","first_party_uid":false,"link_hb_timeout":2000,"link_hb_adserver_subordinate":true,"optimize_realtime_segments":false,"link_hb_adserver":"dfp","target_fingerprint":false,"context_terms":false,"optout_button_id":"kx-optout-button","dfp_premium":true,"control_tag_namespace":"getty"},"prioritized_segments":[],"realtime_segments":[{"id":"s2rwdb03w","test":["and",["and",["or",["intersects","$page_attr_meta_keywords:,",["abstract","animation - moving image","art","art product","best visual effects","color manipulation","color swatch","composite image","computer graphic","computer icon","design element","design professional","design studio","digital animation","digital enhancement","digitally generated image","distorted image","emoticon","graphic designer","holographic","icon set","illustration","illustration technique","illustrator","image animée","image clipart","image composite","image effect","image focus technique","image manipulation","nick cave - visual artist","pattern","photographic effects","radiogram - photographic image","school of visual arts theater","tabla - medios visuales","vector","vibrant color"]]]]]}],"services":{"userdata":"//cdn.krxd.net/userdata/get","contentConnector":"https://connector.krxd.net/content_connector","stats":"//apiservices.krxd.net/stats","optout":"//cdn.krxd.net/userdata/optout/status","event":"//beacon.krxd.net/event.gif","set_optout":"https://consumer.krxd.net/consumer/optout","data":"//beacon.krxd.net/data.gif","link_hb_stats":"//beacon.krxd.net/link_bidder_stats.gif","userData":"//cdn.krxd.net/userdata/get","link_hb_mas":"https://link.krxd.net/hb","config":"//cdn.krxd.net/controltag/{{ confid }}.js","social":"//beacon.krxd.net/social.gif","addSegment":"//cdn.krxd.net/userdata/add","pixel":"//beacon.krxd.net/pixel.gif","um":"https://usermatch.krxd.net/um/v2","controltag":"//cdn.krxd.net/ctjs/controltag.js.{hash}","loopback":"https://consumer.krxd.net/consumer/tmp_cookie","remove":"https://consumer.krxd.net/consumer/remove/6d5b4ec0-7a06-4e4f-a030-61a37ac8ddf6","click":"https://apiservices.krxd.net/click_tracker/track","stats_export":"//beacon.krxd.net/controltag_stats.gif","userdataApi":"//cdn.krxd.net/userdata/v1/segments/get","cookie":"//beacon.krxd.net/cookie2json","proxy":"//cdn.krxd.net/partnerjs/xdi","consent_get":"https://consumer.krxd.net/consent/get/6d5b4ec0-7a06-4e4f-a030-61a37ac8ddf6","consent_set":"https://consumer.krxd.net/consent/set/6d5b4ec0-7a06-4e4f-a030-61a37ac8ddf6","is_optout":"https://beacon.krxd.net/optout_check","impression":"//beacon.krxd.net/ad_impression.gif","transaction":"//beacon.krxd.net/transaction.gif","log":"//jslog.krxd.net/jslog.gif","portability":"https://consumer.krxd.net/consumer/portability/6d5b4ec0-7a06-4e4f-a030-61a37ac8ddf6","set_optin":"https://consumer.krxd.net/consumer/optin","usermatch":"//beacon.krxd.net/usermatch.gif"},"experiments":[],"site":{"name":"Getty Images","cap":255,"id":1653702,"organization_id":2480,"uid":"rvkieuarc"},"tags":[{"id":31615,"name":"Krux DTC - DataLayer Blacklist","content":"<script>\n(function() {\n    var dataObj = Krux('scrape.js_global', 'tracking_data'),\n        userKeys = 'undefined',\n        omitKeys = 'cmscontent,ensighten_url,current_date,request_id,site_catalyst_file_path,user_agent',\n        custDelimit = 'undefined',\n        prefix = 'undefined_',\n        config = {\n            'userKeys': userKeys ? userKeys.split(',') : undefined,\n            'omitKeys': (omitKeys ? omitKeys.split(',') : []).concat([\n                /gtm\\./, // GTM events\n                /sessionid/i, // Session ids\n                /\\.phpsessid$/i, // Session ids\n                /\\.sid$/i, // Session ids\n                /\\.zenid$/i, // Session ids\n                /\\.requestid$/i // Request ids\n            ]),\n            'omitValues': [\n                /.*@.*(?:\\..*)+/, // Email Addresses\n                /gtm\\./, // GTM events\n                /^(https?:)?\\/\\/[^\\/]+/, // URLs\n                /^\\/[^\\/]+/, // URL paths\n                /.{255}/ // Long values\n            ],\n            'customDelimited': custDelimit ? custDelimit.split(',') : undefined,\n            'caseSensitive': 'false' === 'true',\n            'useFullPath': 'false' === 'true',\n            'useLastValue': 'false' === 'true',\n            'convertAttrNames': []\n        };\n    if (!prefix.match(/^$|null|undefined|false/)) {\n        config.convertAttrNames.push({\n            pattern: /((?:page|user)_attr_)/,\n            replacement: '$1' + prefix\n        });\n    }\n    Krux('ingestDataLayer', dataObj, config);\n}).call();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":[]},{"id":30840,"name":"Krux DTC (not)Standard","content":"<script>\n(function(){\n\tvar keywords = jQuery(\"meta[itemprop=keywords]\").prop(\"content\");\n\tKrux('scrape',{'page_attr_url_path_1':{'url_path':'1'}});\n\tKrux('scrape',{'page_attr_url_path_2':{'url_path':'2'}});\n\tKrux('scrape',{'page_attr_url_path_3':{'url_path':'3'}});\n\tKrux('set', {'page_attr_meta_keywords': keywords});\n\n\tKrux('scrape',{'page_attr_domain':{url_domain: '3'}});\n})();\n</script>","target":null,"target_action":"append","timing":"onready","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":[]}],"usermatch_tags":[{"id":6,"name":"Google User Match","content":"<script>\n(function() {\n  if (Krux('get', 'user') != null) {\n      new Image().src = 'https://usermatch.krxd.net/um/v2?partner=google';\n  }\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[]},{"id":15,"name":"TheTradeDesk User Match","content":"<script>\n(function()\n{ var i = new Image(); i.src = '//match.adsrvr.org/track/cmf/generic?ttd_pid=krux&ttd_tpi=1'; }\n)();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[]},{"id":21,"name":"Acxiom","content":"<script>\n(function(){\n  var kuid = Krux('get', 'user');\n  if (kuid) {\n      var liveramp_url = 'https://idsync.rlcdn.com/379708.gif?partner_uid=' + kuid;\n      var i = new Image();\n      i.src = liveramp_url;      \n  }\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[]},{"id":76,"name":"LiveRamp User Matching","content":"<script>\r\n(function(){\r\n  var kuid = Krux('get', 'user');\r\n  if (kuid) {\r\n      var liveramp_url = 'https://idsync.rlcdn.com/379708.gif?partner_uid=' + kuid;\r\n      var i = new Image();\r\n      i.src = liveramp_url;     \r\n  }\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[]},{"id":32,"name":"Casale (Index Exchange) user match","content":"<script>\n(function(){\n\n   var kuid = Krux('get', 'user');\n   if (kuid) {\n      var prefix = window.location.protocol;\n      var casale_url = '';\n      var kurl = '//beacon.krxd.net/usermatch.gif?partner=casale&partner_uid=__UID__';\n      var encode_krux_url = encodeURIComponent(prefix + kurl);\n      \n      if (prefix == \"http:\") {\n         casale_url = prefix + '//ssum.casalemedia.com/usermatchredir?s=183716&cb='+ encode_krux_url;\n      }\n      else if (prefix == \"https:\") { \n         casale_url = prefix + '//ssum-sec.casalemedia.com/usermatchredir?s=183716&cb='+ encode_krux_url; \n      }\n\n      new Image().src = casale_url;\n   }\n\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":2,"template_replacement":false,"internal":true,"criteria":[]},{"id":55,"name":"Acxiom APAC Usermatch","content":"<script>\r\n(function(){\r\n\tvar liveramp_url = '//s.acxiomapac.com/sci',\r\n\tdata = {\r\n\t\tpid: 90010,\r\n\t\tuid: Krux('get','user')\r\n\t};\r\n\tif(data.uid){\r\n\t\tKrux('require:http').pixel({\r\n\t\t\turl: liveramp_url,\r\n\t\t\tdata: data\r\n\t\t});\r\n\t}\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":3,"template_replacement":false,"internal":true,"criteria":[]},{"id":82,"name":"DataLogix - Legacy","content":"<script>\r\n    (function() {\r\n        var kuid = Krux('get', 'user');\r\n        if (kuid) {\r\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\r\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=2dd640a6-6ebd-4d4f-af30-af8baa441a0d&dlxid=<na_id>&dlxdata=<na_da>\");\r\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\r\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=gpwn29rvapq62&ru=' + kurl;\r\n            var i = new Image();\r\n            i.src = dlx_url;\r\n        }\r\n    })();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":3,"template_replacement":false,"internal":true,"criteria":[]}],"link":{"adslots":{},"bidders":{}}};
  
  for (var i = 0, tags = config.tags, len = tags.length, tag; (tag = tags[i]); ++i) {
    if (String(tag.id) in cs) {
      tag.content = cs[tag.id];
    }
  }

  
  var esiGeo = String(function(){/*
   <esi:include src="/geoip_esi"/>
  */}).replace(/^.*\/\*[^{]+|[^}]+\*\/.*$/g, '');

  if (esiGeo) {
    log('Got a request for:', esiGeo, 'adding geo to config.');
    try {
      config.geo = w.JSON.parse(esiGeo);
    } catch (__) {
      
      log('Unable to parse geo from:', config.geo);
      config.geo = {};
    }
  }



  var proxy = (window.Krux && window.Krux.q && window.Krux.q[0] && window.Krux.q[0][0] === 'proxy');

  if (!proxy || true) {
    

  load('//cdn.krxd.net/ctjs/controltag.js.8f9c5605187855d5a137991abae6f700', function() {
    log('Loaded stable controltag resource');
    Krux('config', config);
  });

  }

})(window, (function() {
  var obj = {};
  
  return obj;
})());
