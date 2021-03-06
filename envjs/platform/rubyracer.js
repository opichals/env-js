var __context__ = __this__;

var Envjs = Envjs || 
	require('envjs/platform/core').Envjs;
	require('local_settings');

Envjs.platform       = "V8 RubyRacer";
Envjs.revision       = Ruby.CONFIG.ruby_version;

Ruby.ARGV.shift();
Envjs.argv = Ruby.ARGV;

Envjs.exit = function(){ Ruby.Process['exit!'](); };

/*
 * Envjs rubyracer-env.1.3.pre01 
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 */

//CLOSURE_START
(function(){





/**
 * @author john resig
 */
// Helper method for extending one object with another.
function __extend__(a,b) {
    for ( var i in b ) {
        if(b.hasOwnProperty(i)){
            var g = b.__lookupGetter__(i), s = b.__lookupSetter__(i);
            if ( g || s ) {
                if ( g ) { a.__defineGetter__(i, g); }
                if ( s ) { a.__defineSetter__(i, s); }
            } else {
                a[i] = b[i];
            }
        }
    } 
    return a;
}

Envjs.log = function(msg){
	Ruby.puts(msg);
};

Envjs.lineSource = function(e){
    return "(line ?)";
};

var line = "";
Envjs.readConsole = function(){
	try{
		line = Ruby.$stdin.gets();
	}catch(e){
		console.log('ERROR : %s', e);
	}
	return line;
};

Envjs.prompt = function(){
  	Ruby.$stdout.write(Envjs.CURSOR+' ');
	Ruby.$stdout.flush;
};

//No REPL for
Envjs.repl = function(){
	console.log('Envjs REPL Not Available');
};
(function(){
    
var log = Envjs.logger('Envjs.Platform.RubyRacer');

Envjs.eval = function(context, source, name){
    if(context == __this__){
        return __this__.eval( source );
    }else{
		log.debug('evaluating in proxy scope %s', context);
	    return context.eval( source );
    }
};

})();
/**
 * synchronizes thread modifications
 * @param {Function} fn
 */
 Envjs.sync = function(fn){
     //console.log('Threadless platform, sync is safe');
     return sync(fn);
 };

 Envjs.spawn = function(fn){
     return spawn(fn);
 };

/**
 * sleep thread for specified duration
 * @param {Object} milliseconds
 */
Envjs.sleep = function(milliseconds){
	return Ruby.sleep(1.0*milliseconds/1000.0);
};
//Since we're running in spydermonkey I guess we can safely assume
//java is not 'enabled'.  I'm sure this requires more thought
//than I've given it here
Envjs.javaEnabled 	 = false;

Envjs.homedir        = Ruby.ENV.HOME
Envjs.tmpdir         = Ruby.ENV.TMPDIR;
Envjs.os_name        = Ruby.CONFIG.host_os;
Envjs.os_arch        = Ruby.CONFIG.host_cpu;
Envjs.os_version     = "";//part of os_arch
Envjs.lang           = Ruby.ENV.LANG;

Envjs.gc = function(){ Ruby.gc(); };

/**
 * Makes an object window-like by proxying object accessors
 * @param {Object} scope
 * @param {Object} parent
 */
Envjs.proxy = function(scope, parent) {
    try{
        if(scope == __this__){
            return scope;
        }else{
            return new_context();
        }
    }catch(e){
        console.log('failed to init standard objects %s %s \n%s', scope, parent, e);
    }

};
�E8?��)y��`���4��$�?�Y�m, ��DYa�&K}���,D�Jq��g�.�0U�!���z�0��3��6�h:/9���3�W��y�x��=P�1��L�O_�y#<��K�Y/9'�����p|A@�0��|�xΥ'_	{�!��|}+'�Fl#���CP�@���Y!2:Z{�����7B��2]��|��4��� c������,�;xnW�� ��V�s,�,�o7�,�-��>2*�	�_~l���Ik�r��ɩ;�nN�~���  �! Z8AB�NY^�b?�//@��S������vI?���w
�Q��u�!	=���	μ��������;�2d��\�U�X��A ���GXʽ�e�"�����e��Z��m��-�p��'�$#'����7E���<��'"u��y?�������	���f�@?�d&ӫK4��E�$!5���[��#嘓AV�l���h7��H��B�����z׏��Ȋ�zN8,��O������PH�:�С�v�����X�d��!!�-�G׉H����L�B\�?.C)�����~��>�\זU)q��一�h��WO/��ߚ��a��cb%�D�����6xh�����|�<D�b�Pyʤ���O�X��p�L�䆔=l{�p̘�DJ���w(��s\;�PI�
�;բ�u�,l��}7ĕX>��  r! x8AA{��a�$u5'�@ �Q>��*9����YJ������&��ܒ�F ���7Q���	#����cc����-����|.�ME���+�X���o�G'��ˮ��^���yB��(eq�~;r�8�	�u�&��ħ�>_�.-"�'~'&����4����讕��Q2����I/ �X)�B��Z��`�?w���k������!���."���F���*�|�I����Y���}O�$5�ք&�a®q�x���k�	jy�'��w�<f�?	�2T�<d~�g8�	�����pV8�O���q:�#e�T��$�>G���r����O�����Џ�|+�)�ڬ\#���mw�u�WQ����Y�����   ��N�
Kܡ�:�ԛ �  �!�	���_���?��z���������U�z����i���t0����bJT���ߗ��_Y2�?�W�~��%��iI��6b��%�`p��/��J$5�%>R
�
�9�Q�[��� ���C�K��\�K�aAq^q�"�sR�!Oz.�F��"H�5Ч�C�,���I������"d�UN:��{?K��e����H�ɜ�-(� ��T��;A���D�RD�v�ޖ�٧�#��Ud�˖�	��6L���˼����G�'����
tZ-�A�˥�\��Hc�����d���[� _D?�V�;Oh�'�Lh�'�K��ɜ�9�g��pU���-��|�bj����+�x��5�%-1��Tfe�=��v����'������w^_���HlV�J;�p;L�C�k��ؘ5���'�DL`�-�=�0"R��R�2#���  P!�$��~w�&9r�/��O(�'b�*;��^Z=brS�u$A�4�_<�	�SR��)�`����:�~@��O��Z��Ј����o_\��'����חߧ�YnB�X��
*H�� E�n�'*�~�E�K�>��x��a�g���5��Q/�W��^�������� ������8s����$��w�!3;��GYI�|CA_��i�,5�
� �(ܚ��=z��O�����֮A��ׯ�X�^��׿_�}I/ �x�(ϳU~/����4��X�����[�`03�C/��������z����1�̅+����u��_�w�$��rk�
X�����e����0   �! ��	�'��)�c ��"qr�Џ�# J�j���D'2­��U���AB������g8��������a��]1Y|!�4��hc�jY����*$!Mܒ�3��Ƚd�3��(ϫ�G�:��d����Cy2p��O��h������%X�Y0��@�&#�����rqJ��+�
������5��$"߿�~����SP�y|`�DN�؟f3�W��Vl^J��yq��  O! Z8�A?����C��7�����8Fk�'�����H���y|G���Y��Mֿ�e�+Q�3r���'�	͗����������A���n|'��������z���tN��|�/��rd�P����~�X0�ޱ$����
�,7U�e�s�'�����	��J7��a�J����4�����H�� Ȓ=�����܅"�P�7��k�v�^b֮ /q<L�y|��B��G"��q+����[���ǿ��Z�u��D������=��;�8&�-�8�M�gkAЉ<HϕCB_�%8��I�d����d��A�/�W�D[��Ez��  ! x8�C�� A����XΟp�<o��������_�b|!!ɍ��콿Z��r|O��!c�F��"�J�x�a5����O�@Q
=:�J�~"xτ/���lo�6A)����`8���ޟ���z�"��י�+��g�o,�X�.?�?	ܹ��J�T��}QA8������$)Fy0�\��b?�k3�{i�#����������bo�'��x���?.|o��7[c>vs�I����^�%5����S�����e&'���=��6-�7��G��k�^�/�_|�����   ��N�
Kܡ�:�ԛ �  !��7�����O�|��#��>+#�7u�?�۾����������E���y?���-�C�8�}�"T���J$�����
�e�����Y.���>���Z�����?"]~�� �I��@�A�ȧ��6� a'c�d��!T���\��O�K�4Ph0#�i�g4�Y6��׈$�e1B��rI��0��5��}���2������,�o�__��NHY*RF�SJ��IX���A)�A}W�c��wW�&-�L��r�
�*�{�ׁ�����^h �8-ώ�������긂�aA�_� �B1ܱ��?�M��^Կ���K쾹���FE�yG�γ�����|;��Bf���#�n��s�ͣid�)d���<�'�]���y����u?���{�C��K�>��hGq	㣄�4��
PLe9g���{/ꓢJR�]�SUz�\���Z����r��������0�//���XP�7�_��3\�T�PZXn|��`����J��g�W�+���
bh�UR4��.hf4͔!5�d�^=�o\<�����  �!�4��~xS����Opc)�LZ/��-Ff��|�)(:!c��݈y�2m���O��B_�l��=y|�M�G5I��˘B3�J�ܹHC���AӐZ���W���IB$c�k眝�`>e4H��w)��*P�u��/������7��n����lN	��"�O�/���-���HW�O(�4`tag�ߟ��D���ͩ�O��J�`�����Ae�&bm:�1��(�$�bA� �sܤ/����g �~���y?�'����μ�YD�N�O��������|^^�U�2Q�2U@��dPu���*��?��T\EaK��}e�'���{��$���NbZ4�n���h�_8��"qmd�MU߲Z�꼵��w�߿7��7�O!%̄4�f�rjIEZ9։?�6&X��?Ch�F
�����q~h  !! ���'���rV(��JA������/�qƋ	ВFS������avP�D^A���"&eXX�^3�����vI<�޽�*&n��D�dω+=$$rO�������yeow�9K>˜Iw}�
$x���Ut'.���ύT����Ҭ�h������W�����>Q#��>yo�)b���I%�ܿY~&A,��y2�^��?�A!5��F2��Y6.(�h��s���.<ָ�t%��,��]c~e������
�3rw$<%w��*�c�둷���N��.�;�&X��}  �! Z8�A=K&ː�I+Y?��J��!�&$��?���?���N����^1�I1]ߗ������|1�$:���+�w�Oq��;U��7U�ŸBC����%���=2�Y�}4��Ԅyi�#K�4I;���#�{\��q�*+I��i��UU�~Q	�w����1�
#�����'`��g�
/h��I�A��O�i/�B����e�%a�Ւ�+��d�"W���X����c]����Uu|��N��S��K��y#�M��20k�Ԕ¼Qasc���
yLs��MK�^���MDx�@q+�c�׿�~��?�FP�u>�����)K #��,2��u����@�B��ʱ�ʞ�����O^$�B����	�`�!�����-�u��DĚ+˵
��N�hD.��.��~�|��En'^�  ]! x8�C��� M��D
�������D��<���"~2Ⱥ�b$����(��h*7�`V��_�^Ɉ���CW�'�ߛ?���io�XBZ�Q�~BB�U���B��t^��N"B"�_��{.Zd�MA�/���0�VV�l�:����%�
�㰝�5��N��������T���/W_�������&��:����#��FC�}�3
ctxC��ܒf�O����HA��K
|O vL�[�K���4����B��T��n�u�������J������I���	�(�xG²-��(Fm��¾�m'����xd�O��k�gƽ��i���?`�/�����5��   ��N�
Kܡ�:�ԛ �  �!��7��?��\�_����?��������r�3������������ũ�Bˆ��+���Khg���w����{�*�_�������e��_�/�*����P"�OB�q�5>�HVA�r�XE���BB�bQa�;�>R�)(��u�d6��lf4&��d�͙���>Z�з��iq�3�������[p���x�_�!�;�y"��q�ԝ��*!0R��sb���i\\?�\��?�R������L=u:>J�]L��z������Kw���X���}�@��4G ���H$�U
4i�Z���F@��Y���c�W)#�A��f��cyrW ��_x�
�j�l)�
/**
 * @author john resig & the envjs team
 * @uri http://www.envjs.com/
 * @copyright 2008-2010
 * @license MIT
 */
//CLOSURE_END
}());
