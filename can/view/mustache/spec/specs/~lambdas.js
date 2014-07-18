steal('./spec',function(){ window.MUSTACHE_SPECS.push({name:'~lambdas', data: {"overview":"Lambdas are a special-cased data type for use in interpolations and\nsections.\n\nWhen used as the data value for an Interpolation tag, the lambda MUST be\ntreatable as an arity 0 function, and invoked as such.  The returned value\nMUST be rendered against the default delimiters, then interpolated in place\nof the lambda.\n\nWhen used as the data value for a Section tag, the lambda MUST be treatable\nas an arity 1 function, and invoked as such (passing a String containing the\nunprocessed section contents).  The returned value MUST be rendered against\nthe current delimiters, then interpolated in place of the section.\n","tests":[{"name":"Interpolation","desc":"A lambda's return value should be interpolated.","data":{"lambda":{"ruby":"proc { \"world\" }","perl":"sub { \"world\" }","js":"function() { return \"world\" }","php":"return \"world\";","python":"lambda: \"world\""}},"template":"Hello, {{lambda}}!","expected":"Hello, world!"},{"name":"Interpolation - Expansion","desc":"A lambda's return value should be parsed.","data":{"planet":"world","lambda":{"ruby":"proc { \"{{planet}}\" }","perl":"sub { \"{{planet}}\" }","js":"function() { return \"{{planet}}\" }","php":"return \"{{planet}}\";","python":"lambda: \"{{planet}}\""}},"template":"Hello, {{lambda}}!","expected":"Hello, world!"},{"name":"Interpolation - Alternate Delimiters","desc":"A lambda's return value should parse with the default delimiters.","data":{"planet":"world","lambda":{"ruby":"proc { \"|planet| => {{planet}}\" }","perl":"sub { \"|planet| => {{planet}}\" }","js":"function() { return \"|planet| => {{planet}}\" }","php":"return \"|planet| => {{planet}}\";","python":"lambda: \"|planet| => {{planet}}\""}},"template":"{{= | | =}}\nHello, (|&lambda|)!","expected":"Hello, (|planet| => world)!"},{"name":"Interpolation - Multiple Calls","desc":"Interpolated lambdas should not be cached.","data":{"lambda":{"ruby":"proc { $calls ||= 0; $calls += 1 }","perl":"sub { no strict; $calls += 1 }","js":"function() { return (g=(function(){return this})()).calls=(g.calls||0)+1 }","php":"global $calls; return ++$calls;","python":"lambda: globals().update(calls=globals().get(\"calls\",0)+1) or calls"}},"template":"{{lambda}} == {{{lambda}}} == {{lambda}}","expected":"1 == 2 == 3"},{"name":"Escaping","desc":"Lambda results should be appropriately escaped.","data":{"lambda":{"ruby":"proc { \">\" }","perl":"sub { \">\" }","js":"function() { return \">\" }","php":"return \">\";","python":"lambda: \">\""}},"template":"<{{lambda}}{{{lambda}}}","expected":"<&gt;>"},{"name":"Section","desc":"Lambdas used for sections should receive the raw section string.","data":{"x":"Error!","lambda":{"ruby":"proc { |text| text == \"{{x}}\" ? \"yes\" : \"no\" }","perl":"sub { $_[0] eq \"{{x}}\" ? \"yes\" : \"no\" }","js":"function(txt) { return (txt == \"{{x}}\" ? \"yes\" : \"no\") }","php":"return ($text == \"{{x}}\") ? \"yes\" : \"no\";","python":"lambda text: text == \"{{x}}\" and \"yes\" or \"no\""}},"template":"<{{#lambda}}{{x}}{{/lambda}}>","expected":"<yes>"},{"name":"Section - Expansion","desc":"Lambdas used for sections should have their results parsed.","data":{"planet":"Earth","lambda":{"ruby":"proc { |text| \"#{text}{{planet}}#{text}\" }","perl":"sub { $_[0] . \"{{planet}}\" . $_[0] }","js":"function(txt) { return txt + \"{{planet}}\" + txt }","php":"return $text . \"{{planet}}\" . $text;","python":"lambda text: \"%s{{planet}}%s\" % (text, text)"}},"template":"<{{#lambda}}-{{/lambda}}>","expected":"<-Earth->"},{"name":"Section - Alternate Delimiters","desc":"Lambdas used for sections should parse with the current delimiters.","data":{"planet":"Earth","lambda":{"ruby":"proc { |text| \"#{text}{{planet}} => |planet|#{text}\" }","perl":"sub { $_[0] . \"{{planet}} => |planet|\" . $_[0] }","js":"function(txt) { return txt + \"{{planet}} => |planet|\" + txt }","php":"return $text . \"{{planet}} => |planet|\" . $text;","python":"lambda text: \"%s{{planet}} => |planet|%s\" % (text, text)"}},"template":"{{= | | =}}<|#lambda|-|/lambda|>","expected":"<-{{planet}} => Earth->"},{"name":"Section - Multiple Calls","desc":"Lambdas used for sections should not be cached.","data":{"lambda":{"ruby":"proc { |text| \"__#{text}__\" }","perl":"sub { \"__\" . $_[0] . \"__\" }","js":"function(txt) { return \"__\" + txt + \"__\" }","php":"return \"__\" . $text . \"__\";","python":"lambda text: \"__%s__\" % (text)"}},"template":"{{#lambda}}FILE{{/lambda}} != {{#lambda}}LINE{{/lambda}}","expected":"__FILE__ != __LINE__"},{"name":"Inverted Section","desc":"Lambdas used for inverted sections should be considered truthy.","data":{"static":"static","lambda":{"ruby":"proc { |text| false }","perl":"sub { 0 }","js":"function(txt) { return false }","php":"return false;","python":"lambda text: 0"}},"template":"<{{^lambda}}{{static}}{{/lambda}}>","expected":"<>"}],"__ATTN__":"Do not edit this file; changes belong in the appropriate YAML file."}});});